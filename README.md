# digger-utils

![Build status](https://api.travis-ci.org/binocarlos/digger-utils.png)

Small utils library shared between the digger.io and digger libraries

# install

as a node module:

	$ npm install digger-utils

or in the browser using [browserify](https://github.com/substack/node-browserify)

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

## isdiggerid
A naive test to see if a string is a digger id (by checking the length - needs work)

## escapeRegexp
parses a string so it will match literally in a regular expression

```js
var utils = require('digger-utils');

var match = '{[]}'; // this will not match as a RegExp
var escaped = utils.escapeRegexp(match);

// escaped = \{\[\]\}
```

## json_request
returns a pure javascript object representing the passed HTTP req

```js
var utils = require('digger-utils');

// GET /apples.html

app.use(function(req, res, next){
	var json = utils.json_request(req);

	/*
		{
			method:'get',
			url:'/apples.html'
		}
	*/
})

```

## isArray
Returns true is the passed argument is actually an array

## toArray
Converts the given argument into an array (useful for 'arguments')

## is_object_empty
Returns true if the given object has no keys

## strip_private_fields
Removes any field starting with an '_' from the given object

## extend

uses the [extend](https://github.com/justmoon/node-extend) module so we can deep extend objects

## combine_tree_results
takes a list of containers and appends ones that find their parent in the list

```js
var flat_list_of_containers = [...];

var tree_of_containers = utils.combine_tree_results(flat_list_of_containers);
```

## inherits
A copy of node utils.inherits for inheriting classes

## is_server
Returns true if running on node.js - false if on the browser

## moduleloader
Takes 2 module names - one for node.js and one for the browser and requires the correct one

# licence

MIT