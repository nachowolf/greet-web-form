const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const ejs = require('ejs')
const greetFactory = require('./public/src/greet-factory.js');
const greetRoutes = require('./public/routes/greet-routes.js')

const app = express();
const factory = greetFactory();
const routes = greetRoutes(factory)



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', routes.index);

app.get('/greetings/:user', routes.greetAndCounter);

app.post('/greetings/submit', routes.submit);

app.get('/reset', routes.reset);

app.get('/counter/:currentUser', routes.counterCurrent)

app.post('/counter', routes.counter)




let PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
    console.log('App starting on port', PORT)
})