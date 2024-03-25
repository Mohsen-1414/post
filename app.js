require('dotenv').config();
const express = require('express');
const expresslayout = require('express-ejs-layouts');
const db = require('./server/config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');// grab the cookie and save them in a session so that we won't log in all the time 
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);


const sequelizeSessionStore = new SessionStore({
    db: db,
});


const app = express();
const port = process.env.PORT || 8080;


// Middlewares 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'keep it secret, keep it safe.',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: true,
}));



// Templating the engine 
app.use(expresslayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');


// Routing 
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));





// Sync the database and starting the port
db
.sync()
.then(result => {
    console.log("Database connected");
    app.listen(port, ()=>{
        console.log(`app is listening on port ${port}`);
    });
  })
  .catch(err => console.log(err));

