const Sequelize = require('sequelize');
const sequelize = require ('../utils/database');


const Bib_entry = sequelize.define('bib_entry',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   
    title: Sequelize.STRING,
    ref_id: Sequelize.STRING,
    year: Sequelize.STRING,
    venue: Sequelize.STRING,
    volume: Sequelize.STRING,
    issn: Sequelize.STRING,
    pages: Sequelize.STRING,
    other_ids: Sequelize.STRING,

});


module.exports = Bib_entry;