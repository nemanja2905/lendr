# Get dependencies
npm install

# Migrate DB
knex migrate:latest
node INITIALIZE_DB.js

# Start API
npm start

# Start Client app
cd client && npm install
npm start
