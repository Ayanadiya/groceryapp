const Sequelize = require('sequelize');
const sequelize = require('../utils/database');



const Products= sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
}, {
    timestamps: false, // Disable automatic timestamp fields
});



module.exports=Products;