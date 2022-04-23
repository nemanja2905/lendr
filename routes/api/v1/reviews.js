// ~/api/v1
const knexConfig = require('../../../config/db.js');
const appConfig = require('../../../config/app.js');

const passwordHelper = require('../../../utils/passwordHelper.js')

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);
var jwt  = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(400).json({success: false, message: 'Failed to Authenticate'});
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'No token provided'
    })
  }
});

// Post a new review
router.post('/new', (req, res, next) => {
  const review = {
    review_memo: req.body.memo,
    review_created_by_user_id: req.body.created_by_user,
    review_created_for_user_id: req.body.created_for_user,
    review_rating: req.body.rating,
    transaction_id: req.body.transaction_id
  };

  knex
    .insert(review)
    .into('reviews')
    .then(() => {
      res.json({
        success: true,
        message: 'Review added'
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Failed to add review',
        error: error
      })
    })
});

// get reviews for a user
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;

  knex('reviews')
    .select()
    .where('created_for_user_id', '=', userId)
    .then((row) => {
      res.json({
        success: true,
        data: row
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error
      })
    })
});

module.exports = router;
