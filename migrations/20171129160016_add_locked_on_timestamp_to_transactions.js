
exports.up = function(knex, Promise) {
  return knex.schema.table('transactions', (t) => {
    t.timestamp('locked_on_timestamp')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('transactions', (t) => {
    t.dropColumn('locked_on_timestamp');
  })
};
