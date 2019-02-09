/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ProductStock = sequelize.define(
        "ProductStock",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            product_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            stock: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: null,
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
            tableName: "product_stock",
        },
    );
    ProductStock.associate = function(models) {
        ProductStock.belongsTo(models.Product, { foreignKey: "product_id" });
    };
    return ProductStock;
};
