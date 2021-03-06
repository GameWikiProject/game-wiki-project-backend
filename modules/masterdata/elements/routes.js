const router = require('express').Router()

const controller = require("./controllers");
const findById = require("../../../middlewares/findItemById/elements");
const checkBodyIsEmpty = require('../../../middlewares/checkBodyIsEmpty')
const upload = require('../../../config/multer.config')
const uploadGdrive = require('../../../middlewares/uploadToGDrive')
const deleteToGdrive = require('../../../middlewares/deleteToGdrive');

const db = require('../../../models/index')
const ElementalReactions = db.masterdata.elemental_reactions

const checkFile = (req, res, next) => { 
    let name = req.body.el_name || req.data.el_name
    req.FILEID = `ELEMENTS|${name}-${Date.now()}` 
    next()
}

const setIncludes = (req, res, next) => {
    req.includes = [
        ElementalReactions
    ]
    next()
}

const setFileID = (req, res, next) => {
    req.fileid = req.data.el_image_gdriveid
    next()
}

router.get("/", setIncludes, controller.getAll);
router.post("/", checkBodyIsEmpty, upload.single('file'), checkFile, uploadGdrive, controller.create);
router.get("/:id", setIncludes, findById, controller.get);
router.put("/:id", checkBodyIsEmpty, findById, checkFile, upload.single('file'), setFileID, uploadGdrive, controller.update);
router.delete("/:id", findById, setFileID, deleteToGdrive , controller.delete);

module.exports = router