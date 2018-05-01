const certificate = require('./certificate/certificate.service.js');
const certificateTemplate = require('./certificate-template/certificate-template.service.js');
const configure = require('./configure/configure.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(certificate);
  app.configure(certificateTemplate);
  app.configure(configure);
};
