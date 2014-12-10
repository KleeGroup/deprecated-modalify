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