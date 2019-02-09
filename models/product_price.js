/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ProductPrice = sequelize.define(
        "ProductPrice",
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
            price: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
            },
            discounted_price: {
                type: DataTypes.INTEGER(11),
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
            tableName: "product_price",
        },
    );
    ProductPrice.associate = function(models) {
        ProductPrice.belongsTo(models.Product, { foreignKey: "product_id" });
    };
    return ProductPrice;
};
