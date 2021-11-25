
const router = require('express').Router()

router.use('/elements', require('../modules/masterdata/elements/routes'))
router.use('/elemental_reactions', require('../modules/masterdata/elemental_reactions/routes'))
router.use('/elemental_reactions_elements', require('../modules/masterdata/elemental_reactions_elements/routes'))
router.use('/weapon_types', require('../modules/masterdata/weapon_types/routes'))

module.exports = router