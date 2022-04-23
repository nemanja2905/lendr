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

var dwolla = require('dwolla-v2');

// Init dwolla with correct env settings
var dwollaClient = new dwolla.Client({
  key: appConfig.dwollaKey,
  secret: appConfig.dwollaSecret,
  environment: appConfig.dwollaEnvironment,
});

const TOKEN = dwollaClient.auth.client()
  .then((appToken) => {
    return appToken.get('webhook-subscriptions');
  })
  .catch((error) => {    
    console.log('Error getting app token', error);
    return false;
  })

var accountToken = new dwollaClient.Token({access_token: TOKEN});

// FAILED     REQ TYPE    DESCRIPTION
//firstName   yes string  Customer or if business, authorized representative’s first name.
//lastName    yes string  Customer or if business, authorized representative’s last name.
//email       yes string  Customer’s email address.
//type        yes string  Either personal or business. If business, see below for additional required information.
//address1    yes string  First line of the street address of the Customer’s permanent residence. Must be 50 characters or less. Note: PO Boxes are not allowed.
//city        yes string  City of Customer’s permanent residence.
//state       yes string  Two letter abbreviation of the state in which the Customer resides, e.g. CA.
//postalCode  yes string  Postal code of Customer’s permanent residence. Should be a five digit postal code, e.g. 50314.
//dateOfBirth yes string  Customer or if business, authorized representative’s date of birth in YYYY-MM-DD format. Must be 18 years or older.
//ssn         yes string  Last four digits of the Customer’s Social Security Number.
//ipAddress   no  string  Customer’s IP address.
//address2    no  string  Second line of the street address of the Customer’s permanent residence. Must be 50 characters or less. Note: PO Boxes are not allowed.
//phone       no  string  Customer or if business, authorized representative’s 10 digit phone number. No hyphens or other separators, e.g.

// Flow:
// 1) User signs up for Rosco
// 2) In the profile, surface a: 'Add Payment Source' button
// 3) Once clicke d, user is presented with a form with the info below


// Clicking 'add bank account' creates a dwolla user
// IAV flow is presented
// after successful IAV, a funding source is created for the user
// user is now cleared to make and accept loans

function createClient(
  firstName,
  lastName,
  email,
  type = "personal",
  address1,
  city,
  state,
  postalCode,
  dateOfBirth,
  ssn,
  dwolla_id = false
) {

  return new Promise((resolve, reject) => {
    if (!firstName || !lastName || !email || !type || !address1 || !city || !state || !postalCode || (!dwolla_id && (!dateOfBirth || !ssn))) {
      reject('missing params');
    } else {
      const postUrl = dwolla_id ? dwolla_id : 'customers';

      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        type: type,
        address1: address1,
        city: city,
        state: state,
        postalCode: postalCode,
        dateOfBirth: dateOfBirth,
        ssn: ssn
      };

      if (dwolla_id) {
        delete data.ssn;
        delete data.dateOfBirth;
      }

      dwollaClient.auth.client()
        .then(client => {
          client.post(postUrl, data)
            .then((data) => {
              resolve(data)
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error);
        })
    }
  })
}

function getClient(id) {
  if (!id) {
    return false
  } else {
    return dwollaClient.auth.client().then(client => {
      const clientPromise = client.get(`customers/${id}`);
      const fundingPromise = client.get(`customers/${id}/funding-sources`);

      return Promise.all([clientPromise, fundingPromise]);
    })
    .catch((error) => {
      return error
    })
  }
}

function getIAVToken(dwolla_id) {
  return new Promise((resolve, reject) => {
    if (!dwolla_id) {
      reject('No Dwolla ID Passed');
    } else {
      dwollaClient.auth.client().then(client => {
        console.log(client, dwolla_id)
        client.post(`customers/${dwolla_id}/iav-token`)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error);
      })
    }

  })
};
function removeFundingSource(funding_id) {
  return new Promise((resolve, reject) => {
    if (!funding_id) {
      reject('No funding source id passed');
    } else {
      dwollaClient.auth.client().then(client => {
        client.post(`funding-sources/${funding_id}`, {removed: true})
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error);
      })
    }
  })
};

// function getFundingSources(dwolla_id) {
//   return new Promise((resolve, reject) => {
//     if (!dwolla_id) {
//       reject('No dwolla ID passed');
//     } else {
//       dwollaClient.auth.client().then(client => {
//         client.get
//       })
//     }
//   })
// }

// createClient('null', 'Peter', 'Margaritoff', 'pmargaritoff@gmail.com')

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


// Generates a one time token for IAV flow
router.post('/iav', (req, res, next) => {
  const dwollaUrl = req.body.dwolla_token;
  getIAVToken(dwollaUrl)
    .then((data) => {
      res.status(200).json({success: true, data: data.body});
    })
    .catch((error) => {
      res.status(500).json({success: false, error: error})
    })
});

// Gets a dwolla users info & their funding sources
router.get('/user', (req, res, next) => {
  const dwollaUrl = req.headers.dwolla_id;
  getClient(dwollaUrl)
    .then((data) => {
      const dwollaData = {
        success: true,
        data: _.get(data, '[0].body', {}),
        funding: _.get(data, '[1].body._embedded.funding-sources', [])
      }
      res
        .status(200)
        .json({
          ...dwollaData
        });
    })
    .catch((error) => {
      res.status(500).json({success: false, error: error})
    })
});

router.post('/set-primary-funding-source', (req, res, next) => {
  const primaryFundingId = req.body.funding_source_id;
  const userId = req.body.user_id;

  knex('users')
    .where('id', '=', userId)
    .update({
      primary_funding_id: primaryFundingId
    })
    .then((row) => {
      res.status(200).json({success: true, data: row[0]})
    })
    .catch((error) => {
      res.status(500).json({success: false, error: error})
    })
});

router.post('/remove-funding-source', (req, res, next) => {
  const userId = req.body.user_id;
  const funding_id = req.body.funding_source_id;

  removeFundingSource(funding_id)
    .then((data) => {
      knex('users')
        .where('id', '=', userId)
        .update({
          primary_funding_id: null
        })
        .then((row) => {
          res.status(200).json({success: true, data: 'removed funding source'})
        })
        .catch((error) => {
          res.status(500).json({success: false, error: error})
        })
    })
    .catch((error) => {
      res.status(500).json({success: false, error: error})
    })
});

// Creates or updates a dwolla user
router.post('/create', (req, res, next) => {
  createClient(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.type,
    req.body.address1,
    req.body.city,
    req.body.state,
    req.body.postalCode,
    req.body.dateOfBirth,
    req.body.ssn,
    req.body.dwolla_id
  )
  .then((data) => {
    const dwollaUrl = data.headers.get('location');
    const dwollaSplit = dwollaUrl.split('/');
    const dwolla_id = dwollaSplit[dwollaSplit.length - 1];

    if (dwolla_id) {
      // the response from a create should have a location header
      knex('users')
        .where('id', '=', req.body.user_id)
        .update({
          connected_to_dwolla: true,
          dwolla_id: dwolla_id
        })
        .then((row) => {
          res.status(200).json({success: true, data: dwollaUrl});
        })
    } else if (_.get(data, 'body', false)) {
      // the response from an update call
      res.status(200).json({success: true, data: data.body});
    } else {
      res.status(500).json({success: false, error: 'Unable to get Dwolla User ID but user should be created.'})
    }
  })
  .catch((error) => {
    res.status(500).json({success: false, error: error});
  });

});

module.exports = router;
