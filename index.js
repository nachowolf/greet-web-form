const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const ejs = require('ejs')
const greetFactory = require('./public/src/greet-factory.js');

const app = express();
const factory = greetFactory();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', function (req, res){
    res.render('home')
})

let PORT = process.env.PORT || 3008

app.listen(PORT, function () {
    console.log('App starting on port', PORT)
})