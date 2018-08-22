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

app.get('/greetings/:user', function (req, res){
    let user = req.params.user
   
    
     res.render('home',{

        greeted: factory.respond(),
        amount: factory.counter()
     })
})

app.post('/greetings/submit', function (req, res) {
    let user = req.body.user
    let lang = req.body.languageButton
    factory.greetMe(user,lang)
    
    if(user == ""){
        res.render('home',{
            amount: factory.counter()
        })    
    }
   
  else{
    res.redirect('/greetings/' + user) 
  }
    
})

app.get('/reset', function(req, res){
    factory.reset()
    res.redirect('/')
})

app.get('/counter/:currentUser', function(req, res){
    let currentUser = req.params.currentUser
    
    res.render('counter', {
        currentUser,
         greetedCounter: factory.allNamesCounted(currentUser)
       
    })
    })

app.post('/counter', function(req, res){
    let name = factory.currentName()
    console.log(name)
    res.redirect('/counter/' + name)
})




let PORT = process.env.PORT || 3008

app.listen(PORT, function () {
    console.log('App starting on port', PORT)
})