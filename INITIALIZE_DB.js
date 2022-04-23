const knexConfig = require('./config/db');
var knex = require('knex')(knexConfig)

console.log('Connected to db');
console.log('Creating new tables with');

knex.schema
  .createTableIfNotExists('users', (table) => {
    table.increments('id'); // the  user id
    table.string('user_name'); // the user name
    table.string('email'); // the users email
    table.boolean('verified').defaultTo(false); // verified status (verify email address)
    table.integer('user_rating').defaultTo(0); // the user's rating (0 - 5? 0 - 10? something else?)
    table.string('nick'); // optional user nickname
    table.varchar('password'); // password - hashed
    table.timestamp('created_at').defaultTo(knex.fn.now()); // user created at date
    table.specificType('friends', 'integer[]'); // an array of other UID's who are this users friends
    table.unique(['user_name', 'email']) // columns that need to be unique
  })
  .createTableIfNotExists('transactions', (table) => {
    table.increments('id'); // the transaction ID
    table.integer('amount'); // the amount of the transaction
    table.integer('interest'); // the posted interest by the borrower
    table.date('promise_to_pay_date'); // the date on which the borrower promises to return principal + interest
    table.string('memo'); // an optional memo field - figure out how this ties into Dwolla
    table.string('status'); // the status (pending, accepted, active, paid, defaulted)
    table.timestamp('created_at').defaultTo(knex.fn.now()); // created at date of the transaction post
    table.integer('created_by_user_id').unsigned().references('users.id'); // the uid of the person creating the transaction - the borrower
    table.string('accepted_by_user_id'); // the sender of the money - the lender
    table.boolean('seen_by_recipient').defaultTo(false); // has the recipient seen this transaction
    table.boolean('seen_by_sender').defaultTo(false); // has the sender seen this transaction
  })
  .createTableIfNotExists('reviews', (table) => {
    table.increments('id'); // the review id
    table.integer('rating'); // the rating given
    table.string('created_by_user_id').unsigned().references('users.id');
    table.integer('created_for_user_id'); // the uid of the user that the review is about
    table.varchar('memo'); // optional review text
    table.specificType('tags', 'varchar[]'); // maybe - tags to id the review
    table.timestamp('created_at').defaultTo(knex.fn.now()); // user created at date
  })
  .catch((error) => {
    console.log('Something went wrong. ', error);
  })

console.log('Created tables');
process.exit(-1);