require('dotenv').config()
const db = require("../../../models");
const ElementalReactionsElements = db.masterdata.elemental_reactions_elements;

const error = require('../../../helpers/errors')
const cleanObj = require('../../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    ElementalReactionsElements.findAll()
        .then(datas => {
            res.send(datas)
        }).catch(err => {
            error(res, 400, err)
        });
}

exports.get = (req, res) => {
    res.send(req.data)
}

exports.create = (req, res) => {
    const data = {
        ere_er_id : req.body.er_id,
        ere_el_id : req.body.el_id
    }
    ElementalReactionsElements.create(data)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.delete = async (req, res) => {
    await req.data.destroy().then(data => {
        res.send({ data });
    })
    .catch(err => {
        error(res, 500, err)
    });
}