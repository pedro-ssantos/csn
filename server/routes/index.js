const express = require('express')
const colors = require('colors');
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const router = express.Router()
const url = 'mongodb://localhost:27017'
const moment = require('moment')
let db

const mongoConnect = async() => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  db = client.db('censo')
}

mongoConnect()

router.all('/*', async(req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  const url = req.url.split('/')
  let color
    switch (req.method) {
    case 'GET':
      color = 'blue'
      break;
    case 'POST':
      color = 'green'
      break;
    case 'PUT':
      color = 'yellow'
      break;
    case 'DELETE':
      color = 'red'
      break;
    default:
      color = 'magenta'
      break;
  }
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  console.log(colors.bold[color](req.method), colors.white(req.url))
  console.log(colors.gray('↳', (ip == '::1' ? 'localhost' : ip)))
  console.log(colors.gray('↳', moment().format('YYYY-MM-DD HH:mm:ss ')))
  next()
})

router.get('/form', async (req, res, next) => {
  let where = {}
  if (req.query['period']) {
    where.period = req.query['period']
  }
  if (req.query['type']) {
    where.type = req.query['type']
  }
  try {
    const formConfig = await db.collection('formConfig').find(where).toArray()
    const formIds = formConfig.map(form => {
      return form.formId
    })
    const whereFormIds = formIds.length > 0 ? {_id: { $in : formIds }} : {}
    const forms = await db.collection('form').find(whereFormIds).sort({ nome : 1 }).toArray()
    res.status(200).json(forms.map(form => {
      return {
        deadline: formConfig[0].deadline,
        nome: form.nome,
        period: formConfig[0].period,
      }
    }))
  } catch (error) { console.log(error)
    res.status(404).send()
  }
})

router.get('/form/:formId', async (req, res, next) => {
  try {
    const form = await db.collection('form').findOne({_id: ObjectID(req.params['formId'])})
    if (form == null) {
      res.status(404).send()
    } else {
      res.status(200).json(form)
    }
  } catch (error) { console.log(error)
    res.status(404).send()
  }
})

router.get('/formConfig', async (req, res, next) => {
  let where = {}
  if (req.query['type']) {
    where.type = req.query['type']
  }
  try {
    const forms = await db.collection('formConfig').find(where).toArray()
    res.status(200).json(forms)
  } catch (error) { console.log(error)
    res.status(404).send()
  }
})

router.put('/form/:formConfigId', async (req, res, next) => {
  try {
    await formSave(req.body, req.params['formConfigId'])
    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
})

router.get('/formConfig/:formConfigId', async (req, res, next) => {
  try {
    const item = await db.collection('formConfig').findOne({_id: ObjectID(req.params['formConfigId'])})
    if (item == null) {
      res.status(404).send()
    } else {
      res.status(200).json(item)
    }
  } catch (error) { 
    res.status(404).send()
  }
})

router.get('/formLog/:formId', async (req, res, next) => {
  try {
    const collection = await db.collection('formLog').find({formId: ObjectID(req.params['formId'])}).toArray()
    res.status(200).json(collection)
  } catch (error) { 
    res.status(404).send()
  }
})

const formSave = async (obj, formConfigId) => {
  const formConfig = await db.collection('formConfig').findOne({_id: ObjectID(formConfigId)})
  const form = await db.collection('form').findOne({_id: ObjectID(formConfig.formId)})
  let objUpdate = {}
  // console.log('formSave')
  // console.log('formConfig', formConfig)
  // console.log('form', form)
  // console.log('obj', obj)
  for (const [field, value] of Object.entries(obj)) {
    if (field === '_id') {
      continue
    }
    if (hasPermission(field, formConfig)) {
      objUpdate[field] = value
    } else {
      console.log(field, 'nao tem permissao')
    }
  }
  // console.log(objUpdate)
  if (Object.entries(objUpdate).length === 0 && objUpdate.constructor === Object) {
    return
  } else {
    try {
      const resUpdate = await db.collection('form').update({_id:form._id}, {$set:objUpdate})
      if (resUpdate.result.nModified > 0) {
        logIt(form._id, formConfig.responsible, objUpdate)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const logIt = async (formId, responsible, changes) => {
  try {
    await db.collection('formLog').insertOne({
      formId: formId,
      changes: changes,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      responsible: responsible,
    })
  } catch (error) {
    console.log(error)
  }
}

const hasPermission = (field, formConfig) => {
  if (formConfig.responsible === 'pei') {
    return true;
  } else {
    for (const formConfigField of formConfig.fields) {
      if (formConfigField.id == field && formConfigField.permission == 'update') {
        return true;
      }
    }
  }
  return false;
}

module.exports = router
