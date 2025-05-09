// express e router
const express = require('express');
const router = express.Router()

// importazione controller

const moviesController = require('../controllers/moviesController')

// index router
router.get('/', moviesController.index);

// show router
router.get('/:id', moviesController.show);


// esportazione router
module.exports = router