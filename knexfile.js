// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'app',
      password: 'appusertest',
      database: 'lender_api_dev'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
