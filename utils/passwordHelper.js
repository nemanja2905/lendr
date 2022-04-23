var bcrypt = require('bcrypt');

const passwordHelper = {
  returnHashedPassword(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject('No password supplied')
      }

      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  },

  comparePasswords(ciphertext, plaintext) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, ciphertext, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      });
    })
  }
};

module.exports = passwordHelper;
