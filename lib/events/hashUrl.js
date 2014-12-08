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