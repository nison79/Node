const express = require('express');


//express app

const app = express();


//listen for Requests
app.listen(3000);

//FOR HOME

app.get('/', (req,res) => {
    //res.send('<p>Home</p>');
    res.sendFile('./views/index.html',{ root: __dirname });
});

//FOR ABOUT

app.get('/about', (req,res) => {
    //res.send('<p>about</p>');
    res.sendFile('./views/about.html',{ root: __dirname });
});


//redirects
app.get('/about-us' , (req,res) => {
    res.redirect('/about');
});

//404

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html',{ root: __dirname });
});