/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ProductFabric = sequelize.define(
        "ProductFabric",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            url: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "product_fabric",
        },
    );
    ProductFabric.associate = function(models) {
        ProductFabric.hasMany(models.Product, { foreignKey: "fabric_id" });
        ProductFabric.belongsToMany(models.Tag, {
            through: models.FabricTag,
            foreignKey: "fabric_id",
        });
    };
    return ProductFabric;
};
