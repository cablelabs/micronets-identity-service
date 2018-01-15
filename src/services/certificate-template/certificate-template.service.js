// Initializes the `certificate-template` service on path `/certificate-templates`
const createService = require('feathers-mongodb');
const hooks = require('./certificate-template.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/certificate-templates', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('certificate-templates');

  mongoClient.then(db => {
    service.Model = db.collection('certificate-template');
  });

  service.hooks(hooks);
};
