const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./utils/database');

const shopRoutes=require('./Routes/shop');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'views')));

app.use(shopRoutes);

sequelize.sync()
.then(result =>{
    console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));