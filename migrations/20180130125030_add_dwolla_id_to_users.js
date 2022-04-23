
exports.up = function(knex, Promise) {
  return knex.schema.table('users', (t) => {
    t.string('dwolla_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (t) => {
    t.dropColumn('dwolla_id');
  })
};
