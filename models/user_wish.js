/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var UserWish = sequelize.define(
        "UserWish",
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
        },
        {
            timestamps: false,
            tableName: "user_wish",
        },
    );
    UserWish.associate = function(models) {
        UserWish.belongsTo(models.User, { foreignKey: "user_id" });
        UserWish.belongsTo(models.Product, { foreignKey: "product_id" });
    };
    return UserWish;
};
