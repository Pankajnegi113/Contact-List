var express=require("express");
var app=express();
const path=require('path');
var port=8000;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));
app.use(express.urlencoded({extended:true}));
const db=require('./config/mongoose');
const Contact=require('./models/contact');

//fetching all contacts details from db
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
           title:"Contact List",
           contactList:contacts 
        });
    });
});

//creating contact on add contact button
app.post('/create-contact',function(req,res){
    Contact.create( {name:req.body.name,phone:req.body.phone},function(err,newContact){
       if(err)
       {
           console.log('error in creating contact');
           return;
       }
       return res.redirect('back');
   });
 });
 
//deleting contact from db on clicking on delete icon
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('Error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    })
})

//running app on port 8000
app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error");
        return;
    }
    console.log("Setted up Server correctly at post:",port);
})

