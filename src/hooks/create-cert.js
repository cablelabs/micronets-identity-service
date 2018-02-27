// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var forge = require('node-forge');
var fs = require('fs');
var path = require('path');
var cmd = require('node-cmd')


function execute(command) {
  return new Promise((resolve, reject) => {
    cmd.get(command, (err, resp, stderr) => {
      if (err) return reject(err)
      return resolve(resp)
    })
  })
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    var csrPem = Buffer.from(context.data.csr, 'base64');
        return execute('echo \"' + csrPem + '\" | openssl x509 -req -CA sandbox/ecc-ca.pem -CAkey sandbox/ecc-ca-key.pem -CAcreateserial -out sandbox/temp.pem  -days 500 -sha256 ').then(result => {
          console.log(result)
          var caCertPem = fs.readFileSync(path.join(__dirname, "../../sandbox/", "ecc-ca.pem"));
          var wifiCertPem = fs.readFileSync(path.join(__dirname, "../../sandbox/", "temp.pem"));

          var jsonBlob = {
            wifiCert: wifiCertPem.toString("base64"),
            caCert: caCertPem.toString("base64")
          }
          context.result = jsonBlob

        })
  };
};


//
//   return function createCert(hook) {
//
//     // Read CSR
//     // console.log(hook.data);
//
//     // var csrPem = fs.readFileSync(path.join(__dirname, "../../sandbox/", "micronet.csr"));
//     var csrPem = hook.data.csr;
//     return execute('echo \"' + csrPem + '\" | openssl req -text -noout -verify ')
//       .then(function () {
//         execute('echo \"' + csrPem + '\" | openssl x509 -req -CA sandbox/ecc-ca.pem -CAkey sandbox/ecc-ca-key.pem -CAcreateserial  -days 500 -sha256 ').then(result => {
//           console.log(result)
//           hook.result = result
//         })
//       })
//   }
// };
