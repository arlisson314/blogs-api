'use strict';

// /** 
//  * @param {import('sequelize').Sequelize} sequelize
//  * @param {import('sequelize').DataTypes} DataTypes
//  * */
/**@type {import('sequelize').ModelAttributes} */

const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost',
  {
    id:{ 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    published:{ 
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: { 
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    tableName: 'BlogPosts',
    createdAt: 'published',
    updatedAt: 'updated'
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return BlogPost;
};

module.exports = BlogPost;