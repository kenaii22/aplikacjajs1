const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Rout = require('./routes/routes');

app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/numery', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})



app.use('/', Rout);

app.listen(5000)

