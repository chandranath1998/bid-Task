const express = require('express');
const { createBid } = require('../controllers/bidController');
const router = express.Router();

router.post("/createBid", createBid)

module.exports = router
