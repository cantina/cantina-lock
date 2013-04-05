describe('lock', function () {
  var app, cleanup;

  before(function (done) {
    app = require('cantina');
    app.load(function (err) {
      if (err) return done(err);
      require('../');
      app.init(done);
    });
  });

  after(function (done) {
    cleanup(done);
  });

  it('can create an exclusive lock', function (done) {
    var lock = app.lock({ retries: 0, timeout: 2 });
    lock(function (err, release) {
      assert.ifError(err);
      cleanup = release;
      setTimeout(done, 100);
    });
    lock(function (err, release) {
      assert.ok(err instanceof Error);
      assert.equal(release, null);
    });
  });
});