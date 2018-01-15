const assert = require('assert');
const app = require('../../src/app');

describe('\'certificate-template\' service', () => {
  it('registered the service', () => {
    const service = app.service('certificate-templates');

    assert.ok(service, 'Registered the service');
  });
});
