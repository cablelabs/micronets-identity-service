// Initializes the `configure` service on path `/configure`
const createService = require('feathers-mongoose');
const createModel = require('../../models/configure.model');
const hooks = require('./configure.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'configure',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/configure', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('configure');

  service.hooks(hooks);
};
