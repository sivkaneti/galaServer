const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const port  = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);
console.log(`------- App loaded on port: ${port} -------`);

app.get('/url' , (req,res) => {
    dbConfig.findUrl((err, item) => {
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
          if(err){
              res.status(500).send(err);
          }else{
              res.status(200).send(item);
          }
    });
});
