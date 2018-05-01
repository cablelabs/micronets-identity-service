const getTemplate = require('../../hooks/get-template');

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [ ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getTemplate()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
