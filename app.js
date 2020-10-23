const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { response } = require('express');
const { result } = require('lodash');



//express app

const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://georgenison:drmtcsn79@georgenikogloublog.gqwit.mongodb.net/GeorgeNikoglouBlog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
//register view engine
app.set('view engine','ejs');


//listen for Requests
//app.listen(3000);

//MIDDLEWARE &static files
app.use(express.static('public'))
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res) => {
//     const blog = new Blog({
//         title: 'new blog2',
//         snippet:'about the ',
//         body: 'i want to write some things'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs',(req,res) =>{
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) =>{
//             console.log(err)
//         });
//});

// app.get('/single-blog', (req,res) => {
//     Blog.findById('5f9308820f5f3a3f5a05e026')
//         .then((result) =>{
//             res.send(result);
//         })
//         .catch((err) =>{
//             console.log(err);
//         });
// })





//routes

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    //res.send('<p>about</p>');
    res.render('about', { title : 'About'});
});

//blog routes
app.get('/blogs', (req,res)=> {
    Blog.find().sort({ createdAt: -1  })
        .then((result)=> {
            res.render('index', { title: 'All Blogs', blogs:result})
        })
        .catch((err)=> {
            console.log(err);
        });
});
app.get('/blogs/create', (req,res) => {
    res.render('create', { title : 'Create A  new Blog'});
});
//404

app.use((req, res) => {
    res.status(404).render('404', { title : '404'}); 
});