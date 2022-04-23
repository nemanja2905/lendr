
exports.up = function(knex, Promise) {
  return knex.schema.table('transactions', (t) => {
    t.timestamp('settled_on')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('transactions', (t) => {
    t.dropColumn('settled_on');
  })
};
