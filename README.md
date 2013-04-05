cantina-lock
============

Cluster-wide exclusive locks for [Cantina](https://github.com/cantina/cantina) using [halocksmith](https://github.com/danmactough/halocksmith)

Usage
-----
```js
var lock = app.lock(options);
lock([key], function callback (error, release) {
  if (error) {
    app.log(error); // hopefully no big deal; just couldn't acquire the lock
  }
  else {
    // woot! Let's dooz it, dogsie!
    doSomethingWickedCool();
    // releases the lock
    release([callback (optional)]);
  }
});
```

- `options {Object}`: (optional) available options are:
    - `prefix {String}`: the redis key prefix; will be appended to `cantina:lock:` (or whatever is in the conf)
    - `timeout {Number}`: how long (in seconds) the lock remains valid (default: 120)
    - `retries {Number}`: the number of times to retry acquiring the lock

- `key {String}`: (optional) the name for this lock (you can have many) (default: "")
- `release {Function}`: if the lock was acquired, you'll be passed a release function to release (i.e., delete) the lock when you're done; takes an optional callback, which will receive an `Error` or `null`

### Key Name

The full Redis key name is constructed as follows:
```js
var lock = app.lock({ prefix: my_plugin }); // key prefix is now "cantina:lock:my_plugin:"
lock('my_method', cb); // full key is "cantina:lock:my_plugin:my_method"
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

Copyright (c) 2013 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.