const certificate = require('./certificate/certificate.service.js');
const users = require('./users/users.service.js');
const certificateTemplate = require('./certificate-template/certificate-template.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(certificate);
  app.configure(users);
  app.configure(certificateTemplate);
};
