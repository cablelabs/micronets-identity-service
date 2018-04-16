const assert = require('assert');
const app = require('../../src/app');

describe('\'configure\' service', () => {
  it('registered the service', () => {
    const service = app.service('configure');

    assert.ok(service, 'Registered the service');
  });
});
