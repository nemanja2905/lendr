
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('rating', 'review_rating');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', (t) => {
    t.renameColumn('review_rating', 'rating');
  })
};
