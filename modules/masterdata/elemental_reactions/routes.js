const router = require('express').Router()

const controller = require("./controllers");
const findById = require("../../../middlewares/findItemById/elemental_reactions");
const checkBodyIsEmpty = require('../../../middlewares/checkBodyIsEmpty') 

const db = require('../../../models/index')
const Elements = db.masterdata.elements

const setIncludes = (req, res, next) => {
    req.includes = [
        Elements
    ]
    next()
}

router.get("/", setIncludes, controller.getAll);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:id", setIncludes, findById, controller.get);
router.put("/:id", checkBodyIsEmpty, findById, controller.update);
router.delete("/:id", findById, controller.delete);

module.exports = router