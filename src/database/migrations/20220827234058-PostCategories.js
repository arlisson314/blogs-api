'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories',
    { 
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'BlogPosts', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Categories', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },{
      timestamps: false,
    });
  },

  down: async (queryInterface, _Sequelize) => {

    await queryInterface.dropTable('PostCategories');

  }
};
