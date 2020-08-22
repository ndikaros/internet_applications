const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Paper = sequelize.define('paper',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    paper_id : {
        type: Sequelize.STRING,
        allowNull: false
    }


    
});


module.exports = Paper;