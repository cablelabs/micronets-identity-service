// Initializes the `configure` service on path `/configure`
const createService = require('feathers-memory');
const hooks = require('./configure.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'configure',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/configure', createService({
      paginate: {
        default: 10,
        max: 25
      }
    })
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('configure');

  service.hooks(hooks);
};
