// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    console.log('Hello')
    context.result =  "# Config file used to request a device certificate\n" +
      "\n" +
      "[ req ]\n" +
      "default_keyfile\t\t = privkey.pem\t\t# filename to write a private key to\n" +
      "default_md\t\t = sha256\t\t# message digest to use\n" +
      "prompt\t\t\t = no\t\t\t# do not prompt user\n" +
      "distinguished_name \t = req_DN\t\t# distinguihed name\n" +
      "\n" +
      "\n" +
      "\n" +
      "# Certificate Distinguished Name\n" +
      "[ req_DN ]\n" +
      "C\t\t\t= {country}\t\t# provided by requester\n" +
      "O\t\t\t= {company}\t\t# provided by requester\n" +
      "OU\t\t\t= TEST OpenADR Alliance ECC VTN Certificate\n" +
      "CN\t\t\t= {dns}\t\t\t# provided by requester\n";

    context.result = {
      req: {
        default_keyfile: "privkey.pem",
        default_md: "sha256",
        prompt: false,
        distinguished_name: {
          C: "country",
          O: "company",
          OU: "Micronet WiFi Certificate",
          CN: "dns"
        }
      }
    }

    context.result = {
      "csrTemplate": {
        "keyType": context.app.get("keyType")
      }
    }

    return context;
  };
};
