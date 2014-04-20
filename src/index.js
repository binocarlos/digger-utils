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

  does an object have some keys
  
*/
utils.is_object_empty = function(obj){
  return Object.keys(obj).length<=0;
}

/*

  exports a user object but removing its private fields first
  
*/
utils.strip_private_fields = function(user){
  var ret = {};

  for(var prop in user){
    if(prop.charAt(0)!='_'){
      ret[prop] = user[prop];
    }
  }

  return ret;
}

utils.export_user = utils.strip_private_fields;

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
    var digger = result._digger
    if(digger && digger.path && digger.inode){
      results_map[digger.path + '/' + digger.inode] = result;  
    }
  })

  results.forEach(function(result){
    var digger = result._digger || {}
    var parent = results_map[digger.path];

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

/*

  copy of node.js util.inherits
  
*/
utils.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

utils.is_server = function(){
  return typeof module !== 'undefined' && module.exports;
}

utils.strip_dollars = function(obj){
  var self = this;
  Object.keys(obj || {}).forEach(function(field){
    var val = obj[field];
    if(('' + field).charAt(0)==='$'){
      delete(obj[field]);
    }
    else{
      if(typeof(val)==='object'){
        obj[field] = self.strip_dollars(val);
      }
    }
  })
  return obj;
}

utils.flatten_tree = function(model){
  var arr = [];

  var children = [].concat(model._children || [])
  delete model._children

  arr.push(model)

  children.forEach(function(c){
    arr = arr.concat(utils.flatten_tree(c))
  })

  return arr
}