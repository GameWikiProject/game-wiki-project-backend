
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("elements", {
        el_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        el_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        el_image: {
            type: Sequelize.STRING, 
        },
        el_image_gdriveid: {
            type: Sequelize.STRING, 
        },
        el_status_applied: {
            type: Sequelize.STRING,
            allowNull: false
        },
        el_description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    }, {timestamps: false, schema: 'masterdata',});
    return Model;
};