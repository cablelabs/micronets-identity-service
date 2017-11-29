// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var selfsigned = require('selfsigned');


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createCert (hook) {
    var attrs = [{ name: 'commonName', value: 'contoso.com' }];
    var pems = selfsigned.generate(attrs, { days: 365 });
    console.log(pems)


// The authenticated user
//     const user = hook.params.user;
    // The actual message text
    // const text = hook.data.text
    // Messages can't be longer than 400 characters
    //   .substring(0, 400)
      // Do some basic HTML escaping
      // .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    // Override the original data
    hook.data =  pems;
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
