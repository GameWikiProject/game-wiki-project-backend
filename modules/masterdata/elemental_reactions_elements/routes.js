const router = require('express').Router()

const controller = require("./controllers");
const findById = require("../../../middlewares/findItemById/elemental_reactions_elements");
const findElement = require("../../../middlewares/findItemById/elements");
const findElementalReactions = require("../../../middlewares/findItemById/elemental_reactions");
const checkBodyIsEmpty = require('../../../middlewares/checkBodyIsEmpty') 

router.get("/", controller.getAll);
router.post("/", checkBodyIsEmpty, findElement, findElementalReactions, controller.create);
router.get("/:id", findById, controller.get); 
router.delete("/:id", findById, controller.delete);

module.exports = router