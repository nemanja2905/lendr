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

// Signup
router.post('/signup', (req, res, next) => {
  const user = req.body.email;
  const pass = req.body.password;

  if (!user || !pass) {
    res.json({
      success: false,
      message: 'Missing username or password',
    });
  } else {

    // VALIDATE EMAIL ADDRESS HERE AND BREAK IF WRONG
    passwordHelper
      .returnHashedPassword(pass)
      .then((hash) => {
        knex
          .insert({
            email: user,
            password: hash
          })
          .into('users')
          .then(() => {
            res.json({
              success: true,
              message: `User ${user} created.`
            })
            // Handle sign up email stuff here.
          })
          .catch((error) => {
            res.json({
              success: false,
              message: `Failed creating user ${user}.`,
              error: error
            })
          })
      })
      .catch((error) => {
        res.json({
          success: false,
          message: 'Signup failed',
          error: error
        })
      });
  }
});

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to Authenticate'});
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

/* GET users listing. */
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  knex
    .select()
    .from('users')
    .where({id: userId})
    .then((row) => {
      res.json({
        success: true,
        message: 'Success fetching user Info',
        user: row[0]
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Failure fetching user',
        error: error
      })
    })
});

module.exports = router;
