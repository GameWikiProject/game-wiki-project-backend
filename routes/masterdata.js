
const router = require('express').Router()

router.use('/elements', require('../modules/masterdata/elements/routes'))
router.use('/elemental_reactions', require('../modules/masterdata/elemental_reactions/routes'))
router.use('/elemental_reactions_elements', require('../modules/masterdata/elemental_reactions_elements/routes'))

module.exports = router