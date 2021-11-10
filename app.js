const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const login = require('./routes/login');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use('/login', login);

app.get('/', (req, res)=>{
    res.render('./login');
});

module.exports = app;
