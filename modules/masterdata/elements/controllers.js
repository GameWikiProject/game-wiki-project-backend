require('dotenv').config()
const db = require("../../../models");
const Elements = db.masterdata.elements;

const error = require('../../../helpers/errors')
const cleanObj = require('../../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    Elements.findAll({include: req.includes})
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
    const data = {...req.body, ...req.additional_info}
    Elements.create(data)
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