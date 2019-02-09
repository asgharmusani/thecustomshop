/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define(
        "Tag",
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            tag: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "tag",
        },
    );
    Tag.associate = function(models) {
        Tag.belongsToMany(models.Product, {
            through: models.ProductTag,
            foreignKey: "tag_id",
        });
        Tag.belongsToMany(models.ProductFabric, {
            through: models.FabricTag,
            foreignKey: "tag_id",
        });
    };
    return Tag;
};
