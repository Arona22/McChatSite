function addMessage(message) {
  var messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;

  var chatBox = document.getElementById('chat_box');

  chatBox.insertBefore(messageElement, chatBox.firstChild);

  if (chatBox.children.length >= 3) {
    chatBox.removeChild(chatBox.lastChild);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}


function toggleLightMode() {
  var themeButton = document.getElementById('theme-button');
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeButton.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    themeButton.textContent = '🌞';
    localStorage.setItem('theme', 'dark');
  }
}

function initializeTheme() {
  var currentTheme = localStorage.getItem('theme') || 'dark';
  var themeButton = document.getElementById('theme-button');
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeButton.textContent = '🌙';
  } else {
    themeButton.textContent = '🌞';
  }
}
