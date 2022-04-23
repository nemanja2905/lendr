
exports.up = function(knex, Promise) {
  return knex.schema.table('users', (t) => {
    t.string('primary_funding_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (t) => {
    t.dropColumn('primary_funding_id');
  })
};
