'use strict';

var foo = function (a, b) {
  return a + b;
};

var bar = function (msg) {
  return 'Hello ' + msg;
};

module.exports =  {
    foo: foo,
    //bar: bar
};
