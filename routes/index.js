const knexConfig = require('../config/db.js');

var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);

module.exports = router;
