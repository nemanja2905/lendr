const headers = new Headers({
  'Content-Type': 'application/json'
});

export const API = {
  // Dwolla
  // Makes a funding source primary
  makePrimary(funding_source_id, user_id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          funding_source_id: funding_source_id,
          token: token,
          user_id: user_id
        })
      };

      fetch('/api/v1/dwolla/set-primary-funding-source', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeFundingSource(funding_source_id, user_id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          user_id: user_id,
          funding_source_id: funding_source_id,
          token: token,
        })
      };

      fetch('/api/v1/dwolla/remove-funding-source', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // Generates an IAV Token 
  generateIAVToken(dwolla_token, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          dwolla_token: dwolla_token,
          token: token
        })
      };

      fetch('/api/v1/dwolla/iav', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // Fetches an existing Dwolla customer
  fetchDwollaUser(url, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token,
          'dwolla_id': url
        },
        method: 'GET'
      };

      fetch(`/api/v1/dwolla/user`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        });
    })
  },
  // Creates a new Dwolla 'customer'
  createNewDwollaUser(data, token, dwolla_id) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          ...data,
          token: token,
          dwolla_id: dwolla_id
        })
      };

      fetch('/api/v1/dwolla/create', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  fetchReviewsForUser(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'GET'
      };

      fetch(`/api/v1/reviews/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        });
    });
  },
  addNewReview(data, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          ...data,
          token: token
        })
      };

      fetch('/api/v1/reviews/new', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchAdminInfo(token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/admin`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  repayLoan(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/repay/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  freeTransaction(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/free/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  lockTransaction(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/lock/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  fetchBorrowHistory(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/fetchAllBorrowedForUser/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  fetchLendHistory(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/fetchAllLoanedByUser/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  fetchTransactionsByUserId(id, token) {
    return new Promise((resolve, reject) => {
      const borrowPromise = this.fetchBorrowHistory(id, token);
      const lendPromise = this.fetchLendHistory(id, token);

      Promise.all([borrowPromise, lendPromise])
        .then(([borrowData, lendData]) => {
          resolve({
            borrowData: borrowData,
            lendData: lendData
          })
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  acceptLoan(id, token, fromUser) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          transactionId: id,
          token: token,
          fromUser: fromUser
        })
      }

      fetch('/api/v1/transaction/accept', opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  newTransaction(data, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          ...data,
          token: token
        })
      };

      fetch('/api/v1/transaction/new', opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error)
        })

    });
  },
  authenticate(token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          token: token
        })
      };

      fetch('/api/v1/auth/authenticate', opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  fetchAllTransactions(token){
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch('/api/v1/transaction', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  fetchUserById(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/user/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchTransactionById(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token,
        },
        method: 'GET'
      }

      fetch(`/api/v1/transaction/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loginUser(email, pass) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: pass
        })
      };
      fetch(`/api/v1/auth/login`, opts)
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  signupUser(email, pass) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: pass
        })
      };

      fetch(`/api/v1/auth/signup`, opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
