
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("weapon_types", {
        wt_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        wt_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        wt_icon: {
            type: Sequelize.STRING, 
        },
        wt_icon_gdriveid: {
            type: Sequelize.STRING, 
        },
        wt_description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    }, {timestamps: false, schema: 'masterdata',});
    return Model;
};