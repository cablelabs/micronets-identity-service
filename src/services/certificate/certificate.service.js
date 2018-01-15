// Initializes the `certificate` service on path `/certificates`
const createService = require('feathers-mongodb');
const hooks = require('./certificate.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/certificates', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('certificates');

  mongoClient.then(db => {
    service.Model = db.collection('certificate');
  });

  service.hooks(hooks);
};

function createRA() {

}
