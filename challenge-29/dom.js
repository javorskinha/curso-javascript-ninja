( function(win, doc){
    'use strict';

    function DOM(elements) {
      this.elements = doc.querySelectorAll(elements);
    }

    DOM.prototype.on = function on( event, action ) {
      Array.prototype.forEach.call( this.elements, item => item.addEventListener( event, action))
    }

    DOM.prototype.off = function off( event, action ) {
      this.elements.array.forEach(item => {
        item.removeEventListner( event, action, false )
      });
    }

    DOM.prototype.get = function get(index) {
      if ( !index ) return this.elements[0];
      return this.elements[index];
    }

    function objType (obj){
      return Object.prototype.toString.call(obj)
    }

    DOM.forEach = function (){ return Array.prototype.forEach.apply(this.elements, arguments) };
    DOM.map = function (){ return Array.prototype.map.apply(this.elements, arguments) };
    DOM.filter = function (){ return Array.prototype.filter.apply(this.elements, arguments) };
    DOM.reduce = function (){ return Array.prototype.reduce.apply(this.elements, arguments) };
    DOM.reduceRight = function (){ return Array.prototype.reduceRight.apply(this.elements, arguments) };
    DOM.every = function (){ return Array.prototype.every.apply(this.elements, arguments) };
    DOM.some = function (){ return Array.prototype.some.apply(this.elements, arguments) };

    DOM.isArray = function (obj){ return objType(obj) === '[object Array]'};
    DOM.isObject = function (obj){ return objType(obj) === '[object Object]'};
    DOM.isFunction = function (obj){ return objType(obj) === '[object Function]'};
    DOM.isNumber = function (obj){ return objType(obj) === '[object Number]'};
    DOM.isString = function (obj){ return objType(obj) === '[object String]'};
    DOM.isBoolean = function (obj){ return objType(obj) === '[object Boolean]'};
    DOM.isNull = function (obj){ return objType(obj) === '[object Null]' || objType(obj) === '[object Undefined]'};

    win.DOM = DOM;
})(window, document);
