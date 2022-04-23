
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(() => knex('users').del())
    .then(() => {
      return knex('users').insert({
        user_name: 'Seed Username',
        email: 'seed@lol.com',
        verified: true,
        user_rating: 5,
        nick: 'Seedy McSeedface'
      })
      .then(() => {
        let lastUid;

        // get the uid created in the previous step
        knex
          .select()
          .from('users')
          .then((row) => {

            lastUid = row[0].id
          });

        // Inserts seed entries
        return knex('transactions').insert([
          {
            amount: 100,
            interest: 25,
            promise_to_pay_date: '2017/12/31',
            memo: 'This is a seed file generated transaction. Longer text is long long long',
            created_by_user_id: lastUid
          }
        ]);
      })
    })
};
