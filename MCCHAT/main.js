function addMessage(message) {
  console.log("Adding message:", message);

  var messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;

  var chatBox = document.getElementById('chat_box');
  if (!chatBox) {
    console.error("chat_box element not found");
    return;
  }

  chatBox.insertBefore(messageElement, chatBox.firstChild);

  if (chatBox.children.length >= 40) {
    chatBox.removeChild(chatBox.lastChild);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
  console.log("Connected to WebSocket server");
};

ws.onmessage = function(event) {
  console.log("Full log received:", event.data);

  // This regex matches the line and captures the username and message
  const messageRegex = /\[.*\] \[.*\]: \[CHAT\] <([^>]+)> (.*)/;
  const match = messageRegex.exec(event.data);

  if (match && match[1] && match[2]) { // Check if there's a match and captured groups for the username and message
    const username = match[1];
    const messageText = match[2];
    const formattedMessage = `<${username}> ${messageText}`; // Format the message
    console.log("Extracted message:", formattedMessage); // This should log the username and message text
    addMessage(formattedMessage); // Add the username and message text to the chat box
  }
};



ws.onerror = function(error) {
  console.error("WebSocket error:", error);
};

ws.onclose = function(event) {
  console.log("WebSocket connection closed:", event.code, event.reason);
};






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
