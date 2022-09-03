'use strict';

module.exports = {
   /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {*import('sequelize').Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    const User = await queryInterface.createTable('BlogPosts',
    { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    return User;
  },

  down: async (queryInterface, _Sequelize) => {
    
    await queryInterface.dropTable('BlogPosts');

  }
};
