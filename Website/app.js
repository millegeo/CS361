// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var path = require('path');
PORT        = 10259;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { query } = require('express');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('Images'));
app.use(express.static(path.join(__dirname, 'public/css')));

/*
    ROUTES
*/

// Render home page that has the main functionality implemented onto it
app.get('/', function(req, res) 
    {
        let query1 = "SELECT * FROM Destinations;"
        db.pool.query(query1, function(error, rows, fields){
            res.render('home', {data: rows});  
        }) 
    });

// Show information based on selected input
app.get('/show-table', function(req,res)
    {   
        destinationId = parseInt(req.query.input_destination)
        let query1 = `SELECT * FROM Destinations WHERE destination_id = ${destinationId};`

        db.pool.query(query1, function(error, rows, fields){
            return res.render('show-table', {data : rows})
        })
    });

// Update my table to included added destination:
app.put('/update-table/:destinationId', function(req,res) {
    let data = req.body;
    let destinationId = parseInt(data.id)
    updateQuery = `UPDATE Destinations SET myDestination_id = 1 WHERE Destinations.destination_id = ${destinationId};`

    db.pool.query(updateQuery, function(error, rows, fields){
    })
})

app.put('/delete-table/:destinationId', function(req,res){
    let data = req.body;
    let destinationId = parseInt(data.id)
    removeQuery = `UPDATE Destinations SET myDestination_id = NULL WHERE Destinations.destination_id = ${destinationId};`

    db.pool.query(removeQuery, function(error, rows, fields){

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
})

// Render advanced search page
app.get('/advanced-search', function(req,res){
    return res.render('advanced-search')
})
/*
***************Routes for About Page***************************
*/

// Render about page. Page simply describes what is happening in more detail

app.get('/about-page', function(req, res)
    {
        return res.render('about-page')
    });


// Render mytable page. This page will have a personalized table of vacation spots
// Where the user can update/delete items from their table.

app.get('/mytable-page', function(req, res)
    {
        selectQuery = 'SELECT * FROM Destinations WHERE myDestination_id = 1'

        db.pool.query(selectQuery, function(error, rows, fields){
            return res.render('mytable-page', {data : rows})
        })
        
    });


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});