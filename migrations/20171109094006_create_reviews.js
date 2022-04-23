
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id'); // the review id
      table.integer('rating'); // the rating given
      table.integer('created_by_user_id').unsigned().references('users.id');
      table.integer('created_for_user_id'); // the uid of the user that the review is about
      table.varchar('memo'); // optional review text
      table.specificType('tags', 'varchar[]'); // maybe - tags to id the review
      table.timestamp('created_at').defaultTo(knex.fn.now()); // user created at date
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
