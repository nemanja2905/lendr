exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.integer('transaction_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.dropColumn('transaction_id');
  })
};
