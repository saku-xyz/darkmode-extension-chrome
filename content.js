let darkModeEnabled = false;

function toggleDarkMode() {
  if (darkModeEnabled) {
    document.documentElement.style.filter = '';
  } else {
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
  }
  darkModeEnabled = !darkModeEnabled;
  return darkModeEnabled;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggle) {
    const isEnabled = toggleDarkMode();
    sendResponse({darkModeEnabled: isEnabled});
  }
});

// Restore dark mode if it was enabled
chrome.storage.local.get(['darkModeEnabled'], function(result) {
  if (result.darkModeEnabled) {
    toggleDarkMode();
  }
});
