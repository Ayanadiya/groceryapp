const Sequelize = require('sequelize');

const sequelize = new Sequelize('groceryshop', 'root', 'Ayana@17', {
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;