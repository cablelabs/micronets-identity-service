// Initializes the `certificate-template` service on path `/csrt`
const createService = require('feathers-memory');
const hooks = require('./certificate-template.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/csrt', createService({
      paginate: {
        default: 10,
        max: 25
      }
    })
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('csrt');



  service.hooks(hooks);
};
