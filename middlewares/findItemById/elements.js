const db = require("../../models");
const Elements = db.masterdata.elements;

const error = require('../../helpers/errors')

module.exports = (req, res, next) => {
    Elements.findOne({
        where: {
            el_id: req.params.id ? req.params.id : req.body.el_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "EL not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}