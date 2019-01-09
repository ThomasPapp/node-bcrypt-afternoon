require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { json } = require('body-parser');
const authController = require('./controllers/authController');
const treasureController = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

const PORT = process.env.SERVER_PORT || 4000;
const app = express();

app.use(json());

massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('Database connected');
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

// auth end points
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/auth/logout', authController.logout);

// treasure end points
app.get('/api/treasure/dragon', treasureController.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureController.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureController.adduserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureController.getAllTreasure);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));