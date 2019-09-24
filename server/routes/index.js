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

router.get('/form/:id', async (req, res, next) => {
  try {
    let item = await db.collection('form').findOne({_id: ObjectID(req.params['id'])})
    if (item == null) {
      res.status(404).send()
    } else {
      res.status(200).json(item)
    }
  } catch (error) {
    res.status(404).send()
  }
})

router.get('/formPermission/:id', async (req, res, next) => {
  try {
    let item = await db.collection('formPermission').findOne({_id: ObjectID(req.params['id'])})
    if (item == null) {
      res.status(404).send()
    } else {
      res.status(200).json(item)
    }
  } catch (error) {
    res.status(404).send()
  }
})

module.exports = router
