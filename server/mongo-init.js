print('Start #################################################################');

db = db.getSiblingDB('chantiers_db');
db.createUser({
  user: 'api_user',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'chantiers_db' }]
});
db.createCollection('users');

print('END #################################################################');
