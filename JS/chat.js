
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesList = document.getElementById('messages');
const typingStatus = document.getElementById('typing-status');
const usernameElement = document.getElementById('username');


let currUser = localStorage.getItem('currUser');

let receiver = getParameterByName('user');

usernameElement.textContent = receiver;

// Initialize an empty array to store messages
let messages = [];

loadMessages();

function getParameterByName(name) {

  const url = new URL(window.location.href);
  const parameter = url.searchParams.get(name);
  return parameter;
}

// Function to load messages from local storage
function loadMessages() {

  if (localStorage.getItem('messages')) {

    messages = JSON.parse(localStorage.getItem('messages'));

    messages = messages.filter((message) => {

      return (message.user === currUser && message.receiver === receiver) || 
             (message.user === receiver && message.receiver === currUser);
    });
    displayMessages(messages);
  }
}


sendButton.addEventListener('click', () => {
  sendMessage();
});


function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText) {
    const message = {
      user: currUser,
      receiver: receiver,
      text: messageText,
      timestamp: new Date().toLocaleTimeString()
    };
    messages.push(message);

    localStorage.setItem('messages', JSON.stringify(messages));

    displayMessages(messages);
    messageInput.value = '';
  }
}

// Function to display the messages
function displayMessages(messages) {
  messagesList.innerHTML = '';
  messages.forEach((message) => {

    const messageElement = document.createElement('LI');
    if (message.user === currUser) {

      messageElement.classList.add('you');
    } else {
      messageElement.classList.add('friend');

    }
    const messageText = document.createElement('SPAN');
    messageText.textContent = `${message.user}: ${message.text}`;
    const timestampText = document.createElement('SPAN');
    timestampText.textContent = message.timestamp;
    messageElement.appendChild(messageText);
    messageElement.appendChild(document.createElement('BR'));
    messageElement.appendChild(timestampText);
    messagesList.appendChild(messageElement);
  });
}

// Polling to check for new messages 
setInterval(loadMessages, 1000);
