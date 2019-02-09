/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var FabricTag = sequelize.define(
        "FabricTag",
        {
            tag_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            fabric_id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            timestamps: false,
            tableName: "fabric_tag",
        },
    );
    return FabricTag;
};
