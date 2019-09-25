const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
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

router.get('/form/:formId', async (req, res, next) => {
  try {
    const item = await db.collection('form').findOne({_id: ObjectID(req.params['id'])})
    if (item == null) {
      res.status(404).send()
    } else {
      res.status(200).json(item)
    }
  } catch (error) {
    res.status(404).send()
  }
})

router.put('/form/:formPermissionId', async (req, res, next) => {
  try {
    await formSave(req.body, req.params['formPermissionId'])
    res.status(200).send()
  } catch (error) {
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
  console.log('formSave')
  console.log('formPermission', formPermission)
  console.log('form', form)
  console.log('obj', obj)
}

module.exports = router
