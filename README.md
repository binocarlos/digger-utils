# digger-utils

Small utils library shared between the digger.io and digger libraries

# install

	$ npm install digger-utils

# methods

## diggerid
returns a compact uuid using [hat](https://github.com/substack/hat)

```js
var utils = require('digger-utils');

var id = utils.diggerid();

// id = 95a4bdcc8dc1c7a16da87da7c4b07c38
```
## littleid
returns a random string of (chars) length

```js
var utils = require('digger-utils');

var id = utils.littleid();

// id = d0cd49
```

## escapeRegexp
parses a string so it will match literally in a regular expression

```js
var utils = require('digger-utils');

var match = '{[]}'; // this will not match as a RegExp
var escaped = utils.escapeRegexp(match);

// escaped = \{\[\]\}
```

## extend

uses the [extend](https://github.com/justmoon/node-extend) module so we can deep extend objects

# licence

MIT