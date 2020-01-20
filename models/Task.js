const Sequelize = require('sequelize')
const db = require('../database/db.js')
const User = require('./User') 

const Task = db.sequelize.define(
  'tbl_tasks',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task_name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)

User.hasMany(Task, {
  foreignKey: 'user_id'
});

module.exports = Task