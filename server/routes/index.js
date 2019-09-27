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
  console.log('get /form', req.query)
  let where = {}
  if (req.query['type']) {
    where.type = req.query['type']
  }
  try {
    console.log('where', where)
    const forms = await db.collection('formPermission').find(where).toArray()
    res.status(200).json(forms)
  } catch (error) { console.log(error)
    res.status(404).send()
  }
})

router.put('/form/:formPermissionId', async (req, res, next) => {
  try {
    await formSave(req.body, req.params['formPermissionId'])
    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
})

router.get('/formPermission/:formPermissionId', async (req, res, next) => {
  try {
    const item = await db.collection('formPermission').findOne({_id: ObjectID(req.params['formPermissionId'])})
    if (item == null) {
      res.status(404).send()
    } else {
      res.status(200).json(item)
    }
  } catch (error) { 
    res.status(404).send()
  }
})

const formSave = async (obj, formPermissionId) => {
  const formPermission = await db.collection('formPermission').findOne({_id: ObjectID(formPermissionId)})
  const form = await db.collection('form').findOne({_id: ObjectID(formPermission.formId)})
  let objUpdate = {}
  // console.log('formSave')
  // console.log('formPermission', formPermission)
  // console.log('form', form)
  // console.log('obj', obj)
  for (const [field, value] of Object.entries(obj)) {
    if (field === '_id') {
      continue
    }
    if (hasPermission(field, formPermission)) {
      objUpdate[field] = value
    } else {
      console.log(field, 'nao tem permissao')
    }
  }

  // console.log(objUpdate)
  if (Object.entries(objUpdate).length === 0 && objUpdate.constructor === Object) {
    return
  } else {
    db.collection('form').update({_id:form._id}, {$set:objUpdate}, (err, result) => {
      if (err)
        console.log(err)
    })
  }
}

const hasPermission = (field, formPermission) => {
  if (formPermission.responsible === 'pei') {
    return true;
  } else {
    for (const formPermissionField of formPermission.fields) {
      if (formPermissionField.id == field && formPermissionField.permission == 'update') {
        return true;
      }
    }
  }
  return false;
}

module.exports = router
