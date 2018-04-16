const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');

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
    console.log(context.data);
    execute('openssl ecparam -name prime256v1 -genkey -out sandbox/' + context.data.subscriberId + '-ec-key.pem')
      .then((result) => {
        console.log(result);
        execute('openssl req -new -key sandbox/' + context.data.subscriberId + '-ec-key.pem -out sandbox/' + context.data.subscriberId + '-ec-server.csr -subj \"/C=US/ST=CO/L=Louisville/O=Cablelabs/OU=Micronets/CN=Medical Services\"')
          .then((result) => {
            console.log(result);
            execute('openssl x509 -req -days 365 -in sandbox/' + context.data.subscriberId + '-ec-server.csr -signkey sandbox/' +  context.data.subscriberId + '-ec-key.pem -out sandbox/' + context.data.subscriberId + '-ec-server.pem')
              .then((result) => {
                console.log(result);
                return;
              })
              .catch((err) => {
                console.log(err);
                return;
            })
          })
          .catch((err) =>{
            console.log(err);
          })

      })
      .catch((err) => {
        console.log(err);
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
