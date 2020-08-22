const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Ref_entry = sequelize.define('ref_entry',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    text: Sequelize.STRING,
    latex: Sequelize.STRING,
    type: Sequelize.STRING,
    

});


module.exports = Ref_entry;