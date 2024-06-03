document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('toggle-dark-mode');
  
    // Retrieve the current mode from storage and set the button text accordingly
    chrome.storage.local.get(['darkModeEnabled'], function(result) {
      if (result.darkModeEnabled) {
        button.classList.add('light');
        button.textContent = 'Disable Dark Mode';
      } else {
        button.classList.remove('light');
        button.textContent = 'Enable Dark Mode';
      }
    });
  
    button.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {toggle: true}, function(response) {
          chrome.storage.local.set({darkModeEnabled: response.darkModeEnabled}, function() {
            if (response.darkModeEnabled) {
              button.classList.add('light');
              button.textContent = 'Disable Dark Mode';
            } else {
              button.classList.remove('light');
              button.textContent = 'Enable Dark Mode';
            }
          });
        });
      });
    });
  });
  