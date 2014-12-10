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
  isInit = true;
  return true;
}
/**
 * Add a DOM element in the modal.
 * @param {object} element - el:DOM element, container: .
 */
function addElement(element){
  if(!element.el){
    throw new Error("There should be an el DOM element.");
  }
  if(!element.closeSelector){
    throw new Error("There should be a  close Selector");
  }

  

  /*var closeElement = element.el.querySelector(element.closeSelector);
  if(closeElement === undefined ||  closeElement.tagName !== "A"){
    throw new Error("The closeElement should be a link");
  }*/
  var closeElement = document.createElement('a');
  closeElement.href = "#modalify-close";
  closeElement.setAttribute('data-modalify-action', '');
  if(!isInit){init();}
  if(element.title){
    document.querySelector("[data-modalify-title]").innerHTML = element.title || '';
  }
  var modalContent = document.querySelector("[data-modalify-content]");
  modalContent.innerHTML = "";
  modalContent.insertBefore(element.el, null);
  modalContent.insertBefore(closeElement, null);
  //Reregister dom events hash changing.
  events.hashUrl.cancelUrlChangeCssTarget();
  events.closeModal.closeModalAction(element.closeSelector);

}

module.exports = {
  init: init,
  addElement: addElement
};