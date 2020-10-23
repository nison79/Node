const express = require('express');


//express app

const app = express();

//register view engine
app.set('view engine','ejs');


//listen for Requests
app.listen(3000);

//FOR HOME

app.get('/', (req,res) => {
    const blogs = [
        {title: "The modern society" , snippet: "Lorem ipsum dolor sit amet"},
        {title: "The way people react" , snippet: "Lorem ipsum dolor sit amet"},
        {title: "My journey" , snippet: "Lorem ipsum dolor sit amet"},
    ];
    res.render('index', { title : 'Home', blogs } );
});
 
//FOR ABOUT

app.get('/about', (req,res) => {
    //res.send('<p>about</p>');
    res.render('about', { title : 'About'});
});

app.get('/blogs/create', (req,res) => {
    res.render('create', { title : 'Create A  new Blog'});
});
//404

app.use((req, res) => {
    res.status(404).render('404', { title : '404'}); 
});