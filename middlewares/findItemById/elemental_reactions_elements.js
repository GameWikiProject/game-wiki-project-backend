const db = require("../../models");
const ElementalReactionsElements = db.masterdata.elemental_reactions_elements;

const error = require('../../helpers/errors')

module.exports = (req, res, next) => {
    ElementalReactionsElements.findOne({
        where: {
            ere_id: req.params.id ? req.params.id : req.body.ere_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "ERE not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}