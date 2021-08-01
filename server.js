/// IMPORTS ///
import express from "express";
import { generateWordDocument, deleteFile } from './create_doc.js'

/// INIT ///
var app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

/// ROUTES ///
// Index page
app.get('/', function(req, res) {
  res.render('index');
});

// Form post request
app.post('/doc', async function(req, res) {
    generateWordDocument(req.body).then((status) => {
        if (status) {
            try {
                res.download('./report.doc')
                // res.status(204).send()   
            } catch(e) {
                console.log(e)
                alert.log("There is an error! Please try again.")
            }
        } else {
            res.redirect("/")
        }
    })
})

app.listen(8080);
console.log('Server is listening on port 8080');