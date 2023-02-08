const express = require('express');
const app = express();
const path = require('path');
const http = require('http');

//Set-up environment for key
require('dotenv').config();

//Google Translate API
var api = process.env.API;
var googleTranslate = require('google-translate')(api);

PORT = 9124;

app.get('/', function(req, res) {

    data = req.query.message;
    
    res.sendFile('home.html', {
        root: path.join(__dirname, './')
   })  
})

app.get('/translator', function(req, res) {
    
    data = req.query.message;

    function translateText(data){
        var indicator = 0;
        var translateWords = "";
        var codeBlock = [];
        var key = 0;
        wordArray = data.split(" ");
        for (var i=0; i<wordArray.length; i++) {
            if (wordArray[i] != "```" && indicator == 0) {
                translateWords = translateWords.concat(" ", wordArray[i])
            } else if (wordArray[i] == "```" && indicator == 0) {
                indicator = 1;
                codeBlock.push(wordArray[i]);
                translateWords = translateWords.concat(" ", "{"+key.toString(2)+"}");
            } else if (wordArray[i] != "```" && indicator == 1) {
                codeBlock[key] = codeBlock[key].concat(" ", wordArray[i]);
            } else {
                indicator = 0;
                codeBlock[key] = codeBlock[key].concat(" ", wordArray[i])
                key++;
            }
        }
        if (translateWords != "") {
            googleTranslate.translate(translateWords, 'es', function(err, translation) {
                var finalOutput = "";
                key = 0;
                finalArray = translation.translatedText.split(" ");
                for (var i=0; i<finalArray.length; i++) {
                    if (finalArray[i] == "{"+key.toString(2)+"}") {
                        finalOutput = finalOutput + " " + codeBlock[key];
                        key++;
                    } else {
                        finalOutput = finalOutput + " " + finalArray[i];
                    }
                }
            res.send(finalOutput)  
            })
        }
    }
    translateText(data);
})

app.listen(PORT, function(){
    console.log('Express server started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
})