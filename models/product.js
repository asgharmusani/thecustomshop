/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            sku: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(80),
                allowNull: true,
            },
            subtitle: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            haveStock: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            current_stock: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: null,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            isFeatured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            fabric_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            category_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "product",
        },
    );

    Product.associate = function(models) {
        Product.belongsTo(models.ProductCategory, { foreignKey: "category_id" });
        Product.belongsTo(models.ProductFabric, { foreignKey: "fabric_id" });
        Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
        Product.hasMany(models.ProductStock, { foreignKey: "product_id" });
        Product.hasMany(models.ProductPrice, { foreignKey: "product_id" });
        Product.hasMany(models.Cart, { foreignKey: "product_id" });
        Product.belongsToMany(models.Tag, {
            through: models.ProductTag,
            foreignKey: "product_id",
        });
    };
    return Product;
};
