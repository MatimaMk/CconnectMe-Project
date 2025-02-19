const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesList = document.getElementById('messages');
const usernameElement = document.getElementById('username');

let currUser = getParameterByName('currUser');
let receiver = getParameterByName('user');

usernameElement.textContent = receiver;

// Initialize an empty object to store all users' information
let allUsers = {};

// Initialize an empty array to store all messages
let allMessages = [];

loadAllUsers();
loadAllMessages();

function getParameterByName(name) {
    const url = new URL(window.location.href);
    const parameter = url.searchParams.get(name);
    return parameter;
}

// Function to load all users' information from local storage
function loadAllUsers() {
    if (localStorage.getItem('allUsers')) {
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
}

// Function to add a new user to the allUsers object
function addUser(user) {
    allUsers[user] = user;
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

// Function to get the current user's information from the allUsers object
function getUser(currUser) {
    return allUsers[currUser];
}

// Add the current user to the allUsers object if they don't exist
if (!getUser(currUser)) {
    addUser(currUser);
}

// Update the currUser variable when a new user logs in
function updateCurrUser(newCurrUser) {
    currUser = newCurrUser;
    localStorage.setItem('currUser', currUser);
}

// Function to load all messages from local storage
function loadAllMessages() {
    if (localStorage.getItem('allMessages')) {
        allMessages = JSON.parse(localStorage.getItem('allMessages'));
        displayMessages(allMessages);
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
        allMessages.push(message);
        localStorage.setItem('allMessages', JSON.stringify(allMessages));
        displayMessages(allMessages);
        messageInput.value = '';
    }
}

// Function to display the messages
function displayMessages(messages) {
    messagesList.innerHTML = '';
    messages.forEach((message) => {
        if (message.receiver === receiver && message.user === currUser || message.receiver === currUser && message.user === receiver) {
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
        }
    });
}

// Polling to check for new messages
setInterval(loadAllMessages, 1000);