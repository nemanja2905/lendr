
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('created_at', 'review_created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('review_created_at', 'created_at');
  })
};
