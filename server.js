const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/login', (req, res)=>{
    res.render('login');
});

app.post('/login', (req, res)=>{
    let user_name = req.body.employee;
    let password = req.body.password;
    res.render('./main/index', {employee: user_name, password: password});
});

app.listen(PORT, ()=>{
    console.log(`App started on port: ${PORT}`);
});