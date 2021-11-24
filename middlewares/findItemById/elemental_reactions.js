const db = require("../../models");
const ElementalReactions = db.masterdata.elemental_reactions;

const error = require('../../helpers/errors')

module.exports = (req, res, next) => {
    ElementalReactions.findOne({
        where: {
            er_id: req.params.id ? req.params.id : req.body.er_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "ER not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}