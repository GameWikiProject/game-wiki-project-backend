require('dotenv').config()
const db = require("../../../models");
const ElementalReactions = db.masterdata.elemental_reactions;

const error = require('../../../helpers/errors')
const cleanObj = require('../../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    ElementalReactions.findAll({include: req.includes})
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
    const data = req.body
    ElementalReactions.create(data)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.update = async (req, res) => {
    await req.data.update({...req.body, ...req.additional_info})
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