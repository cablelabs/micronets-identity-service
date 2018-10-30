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
    return execute('make --directory=/etc/freeradius/certs clean client')
      .then((result) => {
        console.log(result)
          var caCertPem = fs.readFileSync(path.join(__dirname, "/etc/freeradius/certs", "ca.pem"));
          var wifiCertPem = fs.readFileSync(path.join(__dirname, "/etc/freeradius/certs", "client.pem"));

          console.log(wifiCertPem)

          var jsonBlob = {
            wifiCert: wifiCertPem.toString("base64"),
            caCert: caCertPem.toString("base64"),
            passphrase: 'whatever'
          }
          context.result = jsonBlob
      })
      .catch((err) => {
        console.log(err);
        context.result = {
          error: err.toString()
        }
        return context;
      })
  };
};
//
// module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
//   return context => {
//     var csrPem = Buffer.from(context.data.csr, 'base64');
//         return execute('echo \"' + csrPem + '\" | openssl x509 -req -CA ssl/certs/ca.pem -CAkey ssl/certs/ca.key -CAcreateserial -out ssl/temp.pem  -days 500 -sha256 ')
//           .then(result => {
//           console.log(result)
//           var caCertPem = fs.readFileSync(path.join(__dirname, "../../ssl/", "ec-server.pem"));
//           var wifiCertPem = fs.readFileSync(path.join(__dirname, "../../ssl/", "temp.pem"));
//
//           var jsonBlob = {
//             wifiCert: wifiCertPem.toString("base64"),
//             caCert: caCertPem.toString("base64")
//           }
//           context.result = jsonBlob
//
//         })
//   };
// };


//
//   return function createCert(hook) {
//
//     // Read CSR
//     // console.log(hook.data);
//
//     // var csrPem = fs.readFileSync(path.join(__dirname, "../../ssl/", "micronet.csr"));
//     var csrPem = hook.data.csr;
//     return execute('echo \"' + csrPem + '\" | openssl req -text -noout -verify ')
//       .then(function () {
//         execute('echo \"' + csrPem + '\" | openssl x509 -req -CA ssl/ecc-ca.pem -CAkey ssl/ecc-ca-key.pem -CAcreateserial  -days 500 -sha256 ').then(result => {
//           console.log(result)
//           hook.result = result
//         })
//       })
//   }
// };
