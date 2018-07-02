var filters = require('../generic/filters');
var endpoint_support = require('./endpoints_support');

// Handlers of the function
function home(request) {
  console.log(request.query);
  return "Hi "+(request.query.name)+". I' am alive!! :)";
}

function handler_database_update(request) {
  const registration_keys = ["custom_string", "session_token", "time_seconds"];
  return JSON.stringify(filters.getData(request,registration_keys,endpoint_support.check_or_update_database));
}


module.exports = {
  'home':home,
  'handler_database_update': handler_database_update,
};