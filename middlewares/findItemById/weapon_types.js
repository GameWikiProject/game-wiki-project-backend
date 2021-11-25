const db = require("../../models");
const WeaponTypes = db.masterdata.weapon_types;

const error = require('../../helpers/errors')

module.exports = (req, res, next) => {
    WeaponTypes.findOne({
        where: {
            wt_id: req.params.id ? req.params.id : req.body.wt_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "WT not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}