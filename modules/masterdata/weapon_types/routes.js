const router = require('express').Router()

const controller = require("./controllers");
const findById = require("../../../middlewares/findItemById/weapon_types");
const checkBodyIsEmpty = require('../../../middlewares/checkBodyIsEmpty')
const upload = require('../../../config/multer.config')
const uploadGdrive = require('../../../middlewares/uploadToGDrive')
const deleteToGdrive = require('../../../middlewares/deleteToGdrive');

const db = require('../../../models/index')

const checkFile = (req, res, next) => { 
    let name = req.body.wt_name || req.data.wt_name
    req.FILEID = `WEAPONTYPES|${name}-${Date.now()}` 
    next()
}

const setFileID = (req, res, next) => {
    req.fileid = req.data.wt_icon_gdriveid
    next()
}

router.get("/", controller.getAll);
router.post("/", checkBodyIsEmpty, upload.single('file'), checkFile, uploadGdrive, controller.create);
router.get("/:id",findById, controller.get);
router.put("/:id", checkBodyIsEmpty, findById, checkFile, upload.single('file'), setFileID, uploadGdrive, controller.update);
router.delete("/:id", findById, setFileID, deleteToGdrive , controller.delete);

module.exports = router