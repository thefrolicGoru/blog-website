const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');

//constants
const PORT = process.env.PORT || 3000

// express app
const app = express();

//mongo
const dbURI = 'mongodb+srv://goru:test1234@backend-blog-web.zjfh9nt.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => app.listen(3000,()=>{
        console.log('Server running on port 3000')
    }))
    .catch((err) => console.log(err));

//register view engine 
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// app.get('/',(req, res)=>{
//      res.send('<p>home page</p>');
//     res.sendFile('./views/index.html',{root: __dirname});
// });

app.get('/about', (req, res) => {
    // res.send('<p>home page</p>'); 
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs',blogRoutes);

// redirects
// app.get('/about-us', (req,res) => {
//     res.redirect('/about');
// });

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});