/**
 * Modal template.
 * @type {function}
 */
var templateModal = require('./templates/modal');
var domElement = require('./util/domElement');
var events = require('./events');
/**
 * Configuration file.
 * @type {object}
 */
var conf = require('./config.json');

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
function init(options){
  options = options || {};
  if(isInit){
    return false;
  }
  var template = options.template || templateModal;
  var selector = options.selector || conf.selector;
  document.querySelector(selector).appendChild(domElement(template()));
  events.hashUrl.cancelUrlChangeCssTarget();
  return true;
}
/**
 * Add a DOM element in the modal.
 * @param {object} element - DOM element.
 */
function addElement(element){
  if(!isInit){init();}
}

module.exports = {
  init: init,
  addElement: addElement
};