const application = require('./app');
const PORT = process.env.PORT || 3000;

application.listen(PORT, ()=>{
    console.log(`App started on port: ${PORT}`);
});
