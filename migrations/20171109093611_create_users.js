
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id'); // the  user id
    table.string('user_name'); // the user name
    table.string('email'); // the users email
    table.boolean('verified').defaultTo(false); // verified status (verify email address)
    table.boolean('connected_to_dwolla').defaultTo(false);
    table.integer('user_rating').defaultTo(0); // the user's rating (0 - 5? 0 - 10? something else?)
    table.string('nick'); // optional user nickname
    table.varchar('password'); // password - hashed
    table.timestamp('created_at').defaultTo(knex.fn.now()); // user created at date
    table.specificType('friends', 'integer[]'); // an array of other UID's who are this users friends
    table.unique(['user_name', 'email']) // columns that need to be unique
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
