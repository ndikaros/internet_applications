const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Ref_span = sequelize.define('ref_span',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    text: Sequelize.STRING,
    ref_id: Sequelize.STRING

});


module.exports = Ref_span;