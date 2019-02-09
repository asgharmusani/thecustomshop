/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var UserDetail = sequelize.define(
        "UserDetail",
        {
            user_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            phone_number_add: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            region: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            address1: {
                type: DataTypes.STRING(80),
                allowNull: true,
            },
            address2: {
                type: DataTypes.STRING(80),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "user_detail",
        },
    );
    UserDetail.associate = function(models) {
        UserDetail.belongsTo(models.User, { foreignKey: "user_id" });
    };
    return UserDetail;
};
