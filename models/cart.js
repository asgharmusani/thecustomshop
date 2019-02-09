/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define(
        "Cart",
        {
            user_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            product_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
            },
            size: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
            },
            discount: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "cart",
        },
    );
    Cart.associate = function(models) {
        Cart.belongsTo(models.User, { foreignKey: "user_id" });
        Cart.belongsTo(models.Product, { foreignKey: "product_id" });
    };
    return Cart;
};
