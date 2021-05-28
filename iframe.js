// Function to get query parameter from the url
var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// Function to add an event listener to an element
var bindEvent = function(element, eventName, eventHandler) {
  if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
  }
};

// Function to send a message to the parent window
var sendMessage = function(msg) {
    var targetOrigin = window.location.origin;
    window.parent.postMessage(msg, targetOrigin);
};

document.addEventListener('DOMContentLoaded', function(){
    console.log('10. iFrame redirected back to uri');

    var currentUrl = window.location.href;
    // Extract the token code from the url
    var code = getParameterByName('code',currentUrl);
    
    // If the code is not null or blank send the code to the main page
    if(code != null && code != ''){
        // id_token is in the URL, this can only occur in the iframe
        // so send this in a message to the parent
        sendMessage('' + code);
        console.log('11. authCode found in iFrame and called PostMessage');
    }
});