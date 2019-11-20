const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));


const enableCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, peiadmin, *');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  }
  else {
    next()
  }
}

app.use(enableCORS);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  const reqInfo = req.url.split('/');
  if (reqInfo[1] && reqInfo[1] == 'admin') {
    if (req.headers['peiadmin'] && req.headers['peiadmin'] == 'censo2019') {
      res.sendFile(path.join(__dirname+'/build/index.html'))
    } else {
      res.status(404).send();
    }
  } else {
    res.sendFile(path.join(__dirname+'/build/index.html'))
  }
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);
