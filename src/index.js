/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*
  Module dependencies.
*/

var extend = require('extend');
var hat = require('hat');
var utils = module.exports = {};

/**
 * generate a new global id
 */

utils.diggerid = function(){
  return hat();
}

utils.littleid = function(chars){

  chars = chars || 6;

  var pattern = '';

  for(var i=0; i<chars; i++){
    pattern += 'x';
  }
  
  return pattern.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/*

  tells you if a string is a digger id or not
  
*/
utils.isdiggerid = function(id){
  return (id && id.match(/^\w{32}$/)) ? true : false;
}

/**
 * takes a string and prepares it to be used in a RegExp itself
 */

utils.escapeRegexp = function(search){
  return search.replace(/([\!\$\(\)\*\+\.\/\:\=\?\[\\\]\^\{\|\}])/g, "\\$1");
}

/*

  return a pure JS version of a HTTP request
  
*/
utils.json_request = function(req){
  return {
    method:req.method.toLowerCase(),
    url:req.url,
    body:req.body,
    headers:req.headers
  }
}

/*

  is arr actually an array
  
*/
utils.isArray = function(arr){
  return Object.prototype.toString.call(arr) == '[object Array]';
}

/*

  return an array version of arguments
  
*/
utils.toArray = function(args){
  return Array.prototype.slice.call(args, 0);
}

/*

  turn a digger url string into an object with:

    * action (read | write)
    * supplier_method (select | append | save | remove)
    * diggerid (a digger context extracted from the url)
    * selector (a single phase of selectors extracted from the url)
  
*/
utils.parse_request = function(method, url){

}

/*

  does an object have some keys
  
*/
utils.is_object_empty = function(obj){
  return Object.keys(obj).length<=0;
}

/*

  exports a user object but removing its private fields first
  
*/
utils.export_user = function(user){
  var ret = {};

  for(var prop in user){
    if(prop.charAt(0)!='_'){
      ret[prop] = user[prop];
    }
  }

  return ret;
}

/**
 * jQuery Deep extend
 */

utils.extend = extend;

/*

   takes a list of containers and appends ones that find their parent in the list
  
*/
utils.combine_tree_results = function(results){
  

  if(!results || results.length==0){
    return [];
  }

  var arrresults = utils.toArray(results);

  var results_map = {};
  // this list of top layer containers
  var top = [];

  // loop each result and it's links to see if we have a parent in the original results
  // or in these results
  results.forEach(function(result){
    results_map[result._digger.diggerid] = result;
  })

  results.forEach(function(result){
    var parent = results_map[result._digger.diggerparentid];

    if(parent){
      parent._children = parent._children || [];
      parent._children.push(result);
    }
    else{
      top.push(result);
    }
  })

  return top;
}