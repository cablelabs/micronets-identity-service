// Initializes the `certificate` service on path `/certificates`
const createService = require('feathers-memory');
const hooks = require('./certificate.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/certificates', createService({
      paginate: {
        default: 10,
        max: 25
      }
    })
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('certificates');


  service.hooks(hooks);
};

function createRA() {

}
