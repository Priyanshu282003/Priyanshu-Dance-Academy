const express = require("express");
const app = express();
const path=require("path");
const fs=require("fs");
const port = 80;
const mongoose = require('mongoose');
const bodyparser=require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const contactSchema = new mongoose.Schema({
    name: "string",
    phone: "string",
    email: "string",
    address: "string",
    desc: "string",
  });
const contact = mongoose.model('contact', contactSchema);  
app.use('/static', express.static('static'));
app.use(express.urlencoded())
// Set the template engine as pug
// here we write pug related stuff
app.set('view engine', 'pug');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.get('/',(req, res)=>{
    const con="This is best way to use the pub"
    const params={}
    res.status(200).render('home.pug', params);
});
app.get('/contact',(req, res)=>{
    // const con="This is best way to use the pub"
    const params={}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
    
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
