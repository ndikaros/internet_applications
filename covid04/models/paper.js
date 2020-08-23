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
    },

    cord_uid: Sequelize.STRING,
    sha : Sequelize.STRING,
    source_x : Sequelize.STRING,
    doi : Sequelize.STRING,
    pmcid : Sequelize.STRING,
    pubmed_id : Sequelize.STRING,
     
    licence : Sequelize.STRING,
    abstract : Sequelize.STRING,
    publish_time : Sequelize.STRING,
    
    journal : Sequelize.STRING,
    mag_id : Sequelize.STRING,
    who_covidence_id : Sequelize.STRING,
    arxiv_id : Sequelize.STRING,
    pdf_json_files : Sequelize.STRING,
    pmc_json_files : Sequelize.STRING,
    s2_id : Sequelize.STRING


    
});


module.exports = Paper;