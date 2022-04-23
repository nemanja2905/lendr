// ~/api/v1
const knexConfig = require("../../../config/db.js");
const appConfig = require("../../../config/app.js");

const passwordHelper = require("../../../utils/passwordHelper.js");

var _ = require("lodash");
var express = require("express");
var router = express.Router();
var knex = require("knex")(knexConfig);
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const adminUsers = ["pmargaritoff@gmail.com"];

router.use((req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to Authenticate" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "No token provided",
    });
  }
});

returnAllTransactions = () => {
  return new Promise((resolve, reject) => {
    knex("transactions")
      .select()
      .then((row) => {
        resolve(row);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

returnAllUsers = () => {
  return new Promise((resolve, reject) => {
    knex("users")
      .select()
      .then((row) => {
        resolve(row);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

returnAllReviews = () => {
  return new Promise((resolve, reject) => {
    knex("reviews")
      .select()
      .then((row) => {
        resolve(row);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

router.get("/", (req, res, next) => {
  const transactionId = req.params.transactionId;

  if (_.includes(adminUsers, req.decoded.email)) {
    const transactionPromise = returnAllTransactions();
    const userPromise = returnAllUsers();
    const reviewPromise = returnAllReviews();

    Promise.all([transactionPromise, userPromise, reviewPromise])
      .then(([transactions, users, reviews]) => {
        res.json({
          success: true,
          transactions: transactions,
          users: users,
          reviews: reviews,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          error: error,
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "You do not have access",
    });
  }
});

module.exports = router;
