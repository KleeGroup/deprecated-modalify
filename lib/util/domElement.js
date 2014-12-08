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