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