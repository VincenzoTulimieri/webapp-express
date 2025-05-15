// express e router
const express = require('express');
const router = express.Router()

// importazione controller

const moviesController = require('../controllers/moviesController');
const upload = require('../middlewares/multer');

// index router
router.get('/', moviesController.index);

// show router
router.get('/:id', moviesController.show);

// post store
router.post('/', upload.single('image'), moviesController.store)

// post store reviews router 
router.post('/:id/reviews', moviesController.storeReviews)


// esportazione router
module.exports = router