'use strict';
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
    published: DataTypes.DATE,
    updated:  DataTypes.DATE,

  }, {
    timestamps: false,
    tableName: 'BlogPost',
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