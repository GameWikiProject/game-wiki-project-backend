require('dotenv').config()
const db = require("../../../models");
const WeaponTypes = db.masterdata.weapon_types;

const error = require('../../../helpers/errors')
const cleanObj = require('../../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    WeaponTypes.findAll({include: req.includes})
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
        wt_icon: req.additional_info.link,
        wt_icon_gdriveid: req.additional_info.fileid
    }
    file_info = cleanObj(file_info)
    const data = {...req.body, ...file_info}
    WeaponTypes.create(data)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.update = async (req, res) => {
    let file_info = {
        wt_icon: req.additional_info.link,
        wt_icon_gdriveid: req.additional_info.fileid
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