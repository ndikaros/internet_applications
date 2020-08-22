const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Tab_ref = sequelize.define('tab_ref',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   
    title: Sequelize.STRING,
    text: Sequelize.STRING,
    latex: Sequelize.STRING,
    type: Sequelize.STRING,
    html: Sequelize.STRING,
    
});


module.exports = tab_ref;