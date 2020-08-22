const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Affiliation = sequelize.define('affiliation',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    laboratory: Sequelize.STRING,
    institution: Sequelize.STRING,
    settlement: Sequelize.STRING,
    region: Sequelize.STRING,
    country: Sequelize.STRING,


    
});


module.exports = Affiliation;