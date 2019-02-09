/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ProductTag = sequelize.define(
        "ProductTag",
        {
            tag_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            product_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            timestamps: false,
            tableName: "product_tag",
        },
    );
    return ProductTag;
};
