(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.jade = require('jade/runtime');
window.modalify=require('./component');
window.modalify.version = require('../package.json').version;
window.modalify.openSelector = 'a[href="#modalify-container"]';
//Minimal selector to trigger modal opening.

},{"../package.json":11,"./component":2,"jade/runtime":10}],2:[function(require,module,exports){
/**
 * Modal template.
 * @type {function}
 */
var templateModal = require('./templates/modal');
var domElement = require('./util/domElement');
var events = require('./events');
var url;
/**
 * Configuration file.
 * @type {object}
 */
var config = require('./config.json');

/**
 * Indicate if the modal container has been initialized.
 * @type {Boolean}
 */
var isInit = false;

/**
 * Initialize the modalify component if not already initialized.
 * @param  {object} options - Overriding options.
 * @return {Boolean} - true if the initialization occurs / false otherwise.
 */
function init(options) {
    options = options || {};
    if (isInit) {
      return false;
    }
    var template = options.template || templateModal;
    var selector = options.selector !== undefined ? options.selector : config.selector;
    //document.querySelector(selector).appendChild(domElement(template()));
    document.body.insertBefore(domElement(template()), document.body.firstChild);
    var openElement = document.createElement('a');
    openElement.href = "#modalify-container";
    openElement.setAttribute('data-modalify-action', '');
    document.body.insertBefore(openElement, document.body.firstChild);
    console.log('addEventListener');
    document.querySelector(selector).querySelector('[data-modalify-close]').addEventListener('click', function(event) {
      console.log('close modal');
      location.hash = url;
    });
    //events.hashUrl.cancelUrlChangeCssTarget();
    isInit = true;
    return true;
  }
  /**
   * Add a DOM element in the modal.
   * @param {object} element - el:DOM element, container: .
   */
function addElement(element) {
  if (!element.el) {
    throw new Error("There should be an el DOM element.");
  }
  element.type || (element.type =  'large');
  document.querySelector("div.modalify-dialog").classList.add(config.type[element.type]);
  /*if (!element.closeSelector) {
    throw new Error("There should be a  close Selector");
  }*/



  /*var closeElement = element.el.querySelector(element.closeSelector);
  if(closeElement === undefined ||  closeElement.tagName !== "A"){
    throw new Error("The closeElement should be a link");
  }*/
  var openElement = document.createElement('a');
  /*openElement.href = "#modalify-container";
  openElement.setAttribute('data-modalify-action', '');*/
  var closeElement = document.createElement('a');
  closeElement.href = "#modalify-close";
  closeElement.setAttribute('data-modalify-action', '');
  if (!isInit) {
    init();
  }
  if (element.title) {
    document.querySelector("[data-modalify-title]").innerHTML = element.title || '';
  }
  var modalContent = document.querySelector("[data-modalify-content]");
  modalContent.innerHTML = "";
  modalContent.insertBefore(element.el, null);
  openModal();
  // document.body.insertBefore(openElement, null);
  //Reregister dom events hash changing.
  // events.hashUrl.cancelUrlChangeCssTarget();
  // events.closeModal.closeModalAction(element.closeSelector);

}

var openModal = function openModal() {
  document.querySelector('[data-modalify-container]').classList.remove('hidden');
  url = location.hash;
  document.querySelector('a[href="#modalify-container"]').click();
};

var closeModal = function closeModal() {
  console.log('closeModalHandler');
    document.querySelector('a[data-modalify-close]').click();
    document.querySelector('[data-modalify-container]').classList.add('hidden');
    for(var type in config.type){
          document.querySelector("div.modalify-dialog").classList.remove(config.type[type]);      
    }
    var modalContent = document.querySelector("[data-modalify-content]");
    modalContent.innerHTML = "";
    
    if (window && window.Backbone !== undefined) {
      Backbone.history.navigate(url);
    } else {
      location.hash = url;
    }
};

module.exports = {
  init: init,
  addElement: addElement,
  close: closeModal,
  open: openModal
};
},{"./config.json":3,"./events":6,"./templates/modal":7,"./util/domElement":8}],3:[function(require,module,exports){
module.exports={
  "selector": "body",
  "type": {
    "extra-small": "modalify-dialog-xs",
    "small": "modalify-dialog-sm",
    "medium": "modalify-dialog-md",
    "large": "modalify-dialog-lg"
  }
}
},{}],4:[function(require,module,exports){
function closeModalAction(selector) {
  selector = selector || "[data-modalify-action]";
  var actionButtons = document.querySelectorAll(selector);
  [].forEach.call(actionButtons, function(btn) {
    btn.addEventListener('click', closeModalEventHandler, false);
  });
}

function closeModalEventHandler(event){
  document.querySelector("#modalify-container a[href='#modalify-close']").click();
}

module.exports = {
  closeModalAction: closeModalAction
};
},{}],5:[function(require,module,exports){
function cancelUrlChangeCssTarget(selector) {
  selector = selector || "a[data-modalify-action]";
  var actionButtons = document.querySelectorAll(selector);
  [].forEach.call(actionButtons, function(btn) {
    btn.addEventListener('click', cancelUrlTargetEvent, false);
  });
}

function cancelUrlTargetEvent(e) {
  var hash = location.hash;
  //TODO: find a better way to do so.
  setTimeout( function() {
    if (history.pushState) {
      history.pushState(null, null, hash);
    } else {
      location.hash = hash;
    }
  }, 1);


  // e.preventDefault();
  // history.pushState({}, "", this.href);
}

module.exports = {
  cancelUrlChangeCssTarget: cancelUrlChangeCssTarget
};
},{}],6:[function(require,module,exports){
module.exports = {
  hashUrl : require('./hashUrl'),
  closeModal: require('./closeModal')
};
},{"./closeModal":4,"./hashUrl":5}],7:[function(require,module,exports){
module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"modalify-container\" data-modalify-container=\"data-modalify-container\" aria-hidden=\"true\" class=\"modalify-css\"><div class=\"modalify-dialog\"><div class=\"modalify-header\"><h2 data-modalify-title=\"data-modalify-title\"></h2><a href=\"javascript:modalify.close()\" data-modalify-action=\"data-modalify-action\" data-modalify-close=\"data-modalify-close\" aria-hidden=\"true\" class=\"btn-close\">×</a></div><div data-modalify-content=\"data-modalify-content\" class=\"modalify-content\"></div></div></div>");;return buf.join("");
};
},{}],8:[function(require,module,exports){
/**
 * Creates a DOM element when giving valid HTML.
 * Will not work with invalid standalone HTML.
 * @type {DOMElement}
 */
module.exports = function(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.childNodes[0];
};
},{}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":9}],11:[function(require,module,exports){
module.exports={
  "name": "modalify",
  "version": "0.3.0",
  "description": "Modale css",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/pierr/modalify.git"
  },
  "author": "Pierre Besson <pierre.besson7@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "browserify": "^7.0.0",
    "gulp": "^3.8.10",
    "gulp-concat": "^2.4.2",
    "gulp-define-module": "^0.1.1",
    "gulp-jade": "^0.10.0",
    "gulp-less": "^1.3.7",
    "jade": "^1.8.1",
    "vinyl-source-stream": "^1.0.0"
  },
  "devDependencies": {
    "browser-sync": "^1.7.2"
  }
}

},{}]},{},[1]);
