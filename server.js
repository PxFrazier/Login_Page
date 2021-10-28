const mysql = require('mysql');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'some_password',  //I wouldn't recommend making this plain text.
    database: 'microblast_arts'
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database connection established.');
});

app.get('/', (req, res)=>{
    res.render('login');
});

app.post('/index', (req, res)=>{
    connection.query(`SELECT * FROM employees WHERE EMP_ID = \"${req.body.employee}\" AND EMP_PASSWORD = \"${req.body.password}\"`, (err, result, fields)=>{
        if(err) throw err;
        let rows = JSON.parse(JSON.stringify(result[0]));
        console.log(rows.DEPT_ID); //Demonstrates that the proper department was called. Can be used to ensure only people in this department get access to certain functions.
    });
    
    res.render('./index', {employee: user_name, password: password});
});

app.listen(PORT, ()=>{
    console.log(`App started on port: ${PORT}`);
});
