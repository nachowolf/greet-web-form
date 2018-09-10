const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const greetFactory = require('./public/src/greet-factory.js');
const greetRoutes = require('./public/routes/greet-routes.js');
const pg = require('pg');
const dbFuncs = require('./public/src/db-factory.js');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/codex';


const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const app = express();
const factory = greetFactory();
const stored = dbFuncs(pool, factory);
const routes = greetRoutes(factory, pool, stored);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', routes.index);

// app.get('/greetings/:user', routes.greetAndCounter);

app.post('/greetings/submit', routes.submit);

app.get('/reset', routes.reset);

app.get('/counted/:currentUser', routes.counterCurrent);

app.post('/counter/delete/:currentUser', routes.deleter);

app.get('/counter', routes.counterlist);

app.post('/counter', routes.counter);

let PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
