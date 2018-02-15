// Initializes the `certificate-template` service on path `/csrt`
const createService = require('feathers-mongodb');
const hooks = require('./certificate-template.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/csrt', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('csrt');

  mongoClient.then(db => {
    service.Model = db.collection('csrt');
  });

  service.hooks(hooks);
};
