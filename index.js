var app = require('cantina')
  , halocksmith = require('halocksmith');

require('cantina-redis');

app.conf.add({
  lock: {
    prefix: [app.conf.get('redis:prefix') || 'cantina', 'lock'].join(':') + ':'
  }
});

app.lock = function cantinaLock (options) {
  options = extend({}, app.conf.get('lock'), options);
  if (!options.nodes) {
    options.redisClient = app.redis;
  }
  options.redisClient = options.redisClient || app.redis;
  return halocksmith(options);
};

// Adapted from Underscore.js
function extend (obj) {
  [].slice.call(arguments, 1).forEach(function (source) {
    if (source) {
      for (var prop in source) {
        // Treat these objects like simple hashes
        if (source.hasOwnProperty(prop)) {
          obj[prop] = source[prop];
        }
      }
    }
  });
  return obj;
}
