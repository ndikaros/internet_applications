const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');

const Abstract = sequelize.define('abstract',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    section:{
        type: Sequelize.STRING,
        allowNull:false

    } ,
    text: Sequelize.STRING,
    


    
});


module.exports = Abstract;