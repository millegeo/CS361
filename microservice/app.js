const express = require('express');
const app = express();
const path = require('path')

//Set-up environment for key
require('dotenv').config();

//Google Translate API
var api = process.env.API;
var googleTranslate = require('google-translate')(api);

PORT = 9124;

app.get('/', function(req, res) {

    data = req.query.random;
    
    res.sendFile('home.html', {
        root: path.join(__dirname, './')
   })  
})

app.get('/whatever', function(req, res) {
    data = req.query.random

    googleTranslate.translate(data, 'es', function(err, translation) {
        res.send(translation.translatedText)
    })
})

app.listen(PORT, function(){
    console.log('Express server started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
})