/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var UserMeasurementDetail = sequelize.define(
        "UserMeasurementDetail",
        {
            m_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            neck_circumference: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            shoulder_width: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            chest_circumference: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            stomach_circumference: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            buttocks: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            jacket_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            shirt_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            bicep: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            jacket_sleeve_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            shirt_sleeve_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            wrist: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            waistcoat_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            coat_tail_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            waist: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            u_measurement: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            thigh: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            leg_length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            trouser_leg_circumference: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "user_measurement_detail",
        },
    );
    UserMeasurementDetail.associate = function(models) {
        UserMeasurementDetail.belongsTo(models.UserMeasurement, { foreignKey: "m_id" });
    };
    return UserMeasurementDetail;
};
