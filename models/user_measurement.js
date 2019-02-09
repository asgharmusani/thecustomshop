/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var UserMeasurement = sequelize.define(
        "UserMeasurement",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            user_tag: {
                type: DataTypes.STRING(20),
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
            tableName: "user_measurement",
        },
    );
    UserMeasurement.associate = function(models) {
        UserMeasurement.hasOne(models.UserMeasurementDetail, { foreignKey: "m_id" });
        UserMeasurement.belongsTo(models.User, { foreignKey: "user_id" });
    };
    return UserMeasurement;
};
