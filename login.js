const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*************',
    database: 'microblast_arts'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database connection established.');
});

router.post('/', (req, res)=>{
    let sql_query = `SELECT * FROM employees WHERE EMP_ID = \"${req.body.employee_ID}\" AND EMP_PASSWORD = \"${req.body.password}\"`;
    
    connection.query(sql_query, (err, result)=>{
        if(err) throw err;

        result.length == 0 ?
        res.redirect('/') :
        (function(){
            let rows = JSON.parse(JSON.stringify(result[0]));
            res.render('./main/index', {employee: `${rows.EMP_FIRST_NAME} ${rows.EMP_LAST_NAME}`, email: rows.EMP_EMAIL});
        }());
    });
});

module.exports = router;
