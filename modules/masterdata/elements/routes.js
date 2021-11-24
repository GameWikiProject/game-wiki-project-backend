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
    req.FILEID = `${req.data?.el_id}${req.data ? req.data.el_name : req.body.el_name}-${Date.now()}` 
    next()
}

const setIncludes = (req, res, next) => {
    req.includes = [
        ElementalReactions
    ]
    next()
}

router.get("/", setIncludes, controller.getAll);
router.post("/", checkBodyIsEmpty, checkFile, upload.single('file'), uploadGdrive, controller.create);
router.get("/:id", setIncludes, findById, controller.get);
router.put("/:id", checkBodyIsEmpty, findById, checkFile, upload.single('file'), uploadGdrive, controller.update);
router.delete("/:id", findById, deleteToGdrive , controller.delete);

module.exports = router