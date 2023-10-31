'use strict'

const express=require("express");
const app=express();
const port = process.env.port || 5000;

//folder public 
app.use(express.static(__dirname + '/public'));

const hbs=require('express-handlebars');
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'Layout',
    LayoutsDir:__dirname + "/views/layouts",
    partialsDir:__dirname + "/views/partials"
}))

app.set('view engine','hbs');

app.use("/",require("./routes/IndexRouter"));

app.use((req,res,next)=>{
    res.status(404).render('error',{message:'File not found'});
})
app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).render('error',{message:'Internal error'});
    next();
})

//server listen on port 
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})
