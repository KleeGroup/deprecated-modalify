modalify
=========

## What is it?

A simple tool to create modals with pure css for the rendering and a little js for integration.

## What's inside?

Comes with a ``modalify.js`` file and a `modalify.css` file to integrate.

## API ?

- **modalify** is registered as a library in the DOM. It is available as follows : `window.modalify`

- `modalify.init`
It takes two options: **selector**, where to render the modal container (default is after the body), and **template** to change the 
modal template

```javascript
//init examples
modalify.init();
modalify.init({template: myModalTemplate, selectod: "div#my-super-selector"});
```
- The close action must have an attribute which is `[data-modalify-action]`

- `modalify.addElement`, takes three arguments: **title**: the modal title, by default it is `""`, **closeSelector** a css selector on the close element in order to add the good target it must be a link `<a></a>`, **el** the domElement to inject into the modal container. If you are working with Backbone, the `el` is your `view.el`.

```javascript
modalify.addElement({
  title: i18n.t('myModalTitle'),
  closeSelector:'a',
  el: myView.el
});
```

## Packages
- `bower install --save modalify`

## Articles

- [Modal css](http://codepen.io/maccadb7/pen/nbHEg)

- [CSS&target](http://css-tricks.com/on-target/)
