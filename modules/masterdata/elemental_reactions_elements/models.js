
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("elemental_reactions_elements", {
        ere_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        ere_er_id : {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        ere_el_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
    }, {timestamps: false, schema: 'masterdata',});
    return Model;
};