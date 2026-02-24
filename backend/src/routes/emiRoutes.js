const express = require('express');
const router = express.Router();
const { getEmiPlansByVariant } = require('../controllers/emiController');

// GET /api/emi-plans/:variantId
router.get('/:variantId', getEmiPlansByVariant);

module.exports = router;
