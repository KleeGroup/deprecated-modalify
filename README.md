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
modalify.init({template: myModalTemplate, selector: "div#my-super-selector"});
```

- `modalify.addElement`, takes three arguments: **title**: the modal title, by default it is `"", **el** the domElement to inject into the modal container. If you are working with Backbone, the `el` is your `view.el`., the type allows you to define the width of the modal. Types are defined in `config.json`: `extra-small`, `small`, `medium`, `large`.[large by default]

```javascript
modalify.addElement({
  title: i18n.t('myModalTitle'),
  el: myView.el,
  type: "medium" //Optional large by default
});
```
- The `addElement` method should be called when a user action triggers a modal opening. The user action triggering a modal opening must be a link with a targer equals to #modalify-container.
```javascript
document.querySelector('a[href="#modalify-container"]').addEventListener('click', function(event){
              modalify.addElement({el: a, title: "Test Pierre"});
      });
```
- On the close action of the modal, which you have to implement in your page, you have to call `modalify.close()` it will close the modal and restore the url of the page before the modal opening.

## Packages
- `bower install --save modalify`

## Articles

- [Modal css](http://codepen.io/maccadb7/pen/nbHEg)

- [CSS&target](http://css-tricks.com/on-target/)
