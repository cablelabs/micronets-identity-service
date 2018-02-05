// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var forge = require('node-forge');
var fs = require('fs');
var path = require('path');


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createCert (hook) {
    // Read CSR
    console.log(hook.data);

    // var csrPem = fs.readFileSync(path.join(__dirname, "../../sandbox/", "micronet.csr"));
    var csrPem = hook.data.data;


    var csr = forge.pki.certificationRequestFromPem(csrPem);

// Read CA cert and key
    var caCertPem = fs.readFileSync(path.join(__dirname, "../../sandbox/", "ca.pem"));
    var caKeyPem = fs.readFileSync(path.join(__dirname, "../../sandbox/", "ca.key"));
    var caCert = forge.pki.certificateFromPem(caCertPem);
    var caKey = forge.pki.privateKeyFromPem(caKeyPem);

    if (csr.verify()) {
      console.log('Certification request (CSR) verified.');
    } else {
      throw new Error('Signature not verified.');
    }


    console.log('Creating certificate...');
    var cert = forge.pki.createCertificate();
    cert.serialNumber = '02';

    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);


// subject from CSR
    cert.setSubject(csr.subject.attributes);
// issuer from CA
    cert.setIssuer(caCert.subject.attributes);

    cert.setExtensions([{
      name: 'basicConstraints',
      cA: true
    }, {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    }, {
      name: 'subjectAltName',
      altNames: [{
        type: 6, // URI
        value: 'http://example.org/webid#me'
      }]
    }]);

    cert.publicKey = csr.publicKey;


    cert.sign(caKey);
    console.log('Certificate created.');

    console.log('\nWriting Certificate');

    hook.result = forge.pki.certificateToPem(cert);

    return Promise.resolve(hook);
  };
};
