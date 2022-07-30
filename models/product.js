
'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

    }
    Product.init({
        title: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING,
        imageAlt: DataTypes.STRING,
        show: DataTypes.BOOLEAN,
        slug: DataTypes.STRING,
        shortDescription: DataTypes.TEXT,
        longDescription: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products'
    });
    return Product;
};