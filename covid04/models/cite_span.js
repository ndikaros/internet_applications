const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Cite_span = sequelize.define('cite_span',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    txt: Sequelize.STRING,
    ref_id: Sequelize.STRING

});


module.exports = Cite_span;