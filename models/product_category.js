/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ProductCategory = sequelize.define(
        "ProductCategory",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            category: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "product_category",
        },
    );
    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Product, { foreignKey: "category_id" });
    };
    return ProductCategory;
};
