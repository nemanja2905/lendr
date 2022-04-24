const _ = require('lodash');

const isProduction = _.get(process, 'env.NODE_ENV', false) === 'production';

const knexConfig = isProduction ?
  
  {
   dialect: 'pg',
    connection: {
      host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
    }
}:{
    dialect: 'pg',
    connection: {
      host: 'localhost',
      user: 'app',
      password: 'appusertest',
      database: 'lender_api_dev'
  }
};

module.exports = knexConfig


// const config = {
//     user: process.env.SQL_USER,
//     password: process.env.SQL_PASSWORD,
//     database: process.env.SQL_DATABASE
//   };

//   if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//     config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
//   }