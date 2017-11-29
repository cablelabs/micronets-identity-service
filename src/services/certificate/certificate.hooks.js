const createCert = require('../../hooks/create-cert');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createCert()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
