const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Author = sequelize.define('author',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first: Sequelize.STRING,
    middle: Sequelize.STRING,
    last: Sequelize.STRING,
    suffix: Sequelize.STRING,
    email: {
       type: Sequelize.STRING,
       notEmpty:false,
       //validate: {
         //   isEmail: true   
       //} 
    },
    laboratory: Sequelize.STRING,
    institution: Sequelize.STRING,
    settlement: Sequelize.STRING,
    region: Sequelize.STRING,
    country: Sequelize.STRING,


    
});


module.exports = Author;