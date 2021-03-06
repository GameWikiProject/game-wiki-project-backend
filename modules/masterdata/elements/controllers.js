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

exports.create = (req, res, next) => {
    let file_info = {
        el_image: req.additional_info.link,
        el_image_gdriveid: req.additional_info.fileid
    }
    file_info = cleanObj(file_info)
    const data = {...req.body, ...file_info}
    Elements.create(data)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.update = async (req, res) => {
    let file_info = {
        el_image: req.additional_info.link,
        el_image_gdriveid: req.additional_info.fileid
    }
    file_info = cleanObj(file_info)
    await req.data.update({...req.body, ...file_info})
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