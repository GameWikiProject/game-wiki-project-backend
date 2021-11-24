
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("elemental_reactions", {
        er_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        er_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        er_description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    }, {timestamps: false, schema: 'masterdata',});
    return Model;
};