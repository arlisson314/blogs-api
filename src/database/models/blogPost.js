'use strict';
/** 
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * */
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
      as: 'user',
      foreignKey: 'id'
    });
  };

  return BlogPost;
};

module.exports = BlogPost;