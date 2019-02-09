/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ProductImage = sequelize.define(
        "ProductImage",
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
            url: {
                type: DataTypes.STRING(50),
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
            tableName: "product_image",
        },
    );
    ProductImage.associate = function(models) {
        ProductImage.belongsTo(models.Product, { foreignKey: "product_id" });
    };
    return ProductImage;
};
