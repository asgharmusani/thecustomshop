/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define(
        "Admin",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastlogin: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            gender: {
                type: DataTypes.ENUM("M", "F"),
                allowNull: true,
            },
            phonenumber: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive"),
                allowNull: true,
                defaultValue: "active",
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
            tableName: "admin",
        },
    );
    Admin.associate = function(models) {
        // User.hasOne(models.UserDetail, { foreignKey: "user_id" });
        // User.hasMany(models.UserMeasurement, { foreignKey: "user_id" });
        // User.hasMany(models.Cart, { foreignKey: "user_id" });
        // User.hasMany(models.UserWish, { foreignKey: "user_id" });
    };
    return Admin;
};
