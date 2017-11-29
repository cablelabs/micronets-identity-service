const assert = require('assert');
const app = require('../../src/app');

describe('\'certificate\' service', () => {
  it('registered the service', () => {
    const service = app.service('certificates');

    assert.ok(service, 'Registered the service');
  });
});
