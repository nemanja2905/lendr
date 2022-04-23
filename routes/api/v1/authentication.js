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

router.post('/authenticate', (req, res) => {
  const token = req.body.token;

  jwt.verify(token, appConfig.secret, (err, decoded) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Invalid token'
      })
    } else {
      // db call to make sure username and uid match
      knex
        .select()
        .from('users')
        .where({
          email: decoded.email
        })
        .then((row) => {
          if (row[0].email === decoded.email && row[0].id === decoded.id)
          res.json({
            success: true,
            message: 'Valid token. User authenticated.',
            token: token,
            ...row[0]
          })
        })
        .catch((error) => {
          res.status(400).json({
            success: false,
            message: 'Failure to authenticate with provided token',
            error: error
          })
        })
    }
  })
});

router.post('/login', (req, res) => {
  knex
    .select()
    .from('users')
    .where({
      email: req.body.email
    })
    .then((row) => {
      if (_.isEmpty(row)) {
        res.json({
          success: false,
          message: 'Invalid Credentials'
        });
      } else {
        const ciphertext = row[0].password;
        const plaintext = req.body.password;

        passwordHelper.comparePasswords(ciphertext, plaintext)
          .then((passwordResponse) => {
            if (!passwordResponse) {
              res.json({
                success: false,
                message: 'Invalid Credentials'
              });
            } else {
              const payload = {
                email: row[0].email,
                id: row[0].id,
                exp: new Date().getTime() + 3600000
              };
              const token = jwt.sign(payload, appConfig.secret);
              res.json({
                success: true,
                message: 'Token Issued.',
                token: token,
                ...row[0]
              });
            }
          })
          .catch((error) => {
            res.json({
              success: false,
              message: 'Something went wrong',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.json(error)
    })
});

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
              message: `User ${user} created.`,
              email: user,
              password: pass
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

module.exports = router;
