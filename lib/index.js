window.jade = require('jade/runtime');
window.modalify=require('./component');
window.modalify.version = require('../package.json').version;
window.modalify.openSelector = 'a[href="#modalify-container"]';
//Minimal selector to trigger modal opening.
