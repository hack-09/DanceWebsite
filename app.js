const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;


var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))  // for serving static file
app.use(express.urlencoded())

// Pug specific server
app.set('view engine','pug')  //set the templete engine as pug
app.set('views',path.join(__dirname,'views')) // set the views directory

// Endpoints
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
});

app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug')
});


// Start the server
app.listen(port,()=>{
    console.log(`The application started sucessfully on port ${port}`);
})