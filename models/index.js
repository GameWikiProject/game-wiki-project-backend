const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.masterdata = {
    elements: require("../modules/masterdata/elements/models.js")(sequelize, Sequelize),
    elemental_reactions:require("../modules/masterdata/elemental_reactions/models.js")(sequelize, Sequelize),
    elemental_reactions_elements:require("../modules/masterdata/elemental_reactions_elements/models.js")(sequelize, Sequelize),
    weapon_types:require("../modules/masterdata/weapon_types/models.js")(sequelize, Sequelize),
}

db.masterdata.elements.belongsToMany(db.masterdata.elemental_reactions, {
    through: 'elemental_reactions_elements',
    foreignKey: 'ere_el_id',  
    otherKey: 'ere_er_id' 
})

db.masterdata.elemental_reactions.belongsToMany(db.masterdata.elements, {
    through: 'elemental_reactions_elements',
    foreignKey: 'ere_er_id',  
    otherKey: 'ere_el_id' 
})

module.exports = db;