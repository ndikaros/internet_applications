const  Sequelize  = require('sequelize');


 const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/sci_paper.sqlite'
    
  });
  
  module.exports= sequelize;
