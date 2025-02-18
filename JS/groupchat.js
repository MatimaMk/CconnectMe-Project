// Function to display all users except the current one
function displayUsers() {
    const users = [];
    // Loop through localStorage to collect all users except the current user
    for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);

        if (username !== "groupChatMessages" && username !== "currUser") {
            const user = { username: username };
            users.push(user);
        }
    }

    const userList = document.getElementById("conList");
    userList.innerHTML = '';

    if (users.length === 0) {
        userList.innerHTML = '<li>No users available.</li>';
        return;
    }

    // Create list items for each user
    users.forEach((user) => {
        const listItem = document.createElement("LI");
        listItem.innerHTML = `<i class="fa fa-user" aria-hidden="true" style="margin-right: 10px;"></i>${user.username}`;
        userList.appendChild(listItem);
    });
}

// Function to display group chat messages
function displayGroupMessages() {
    const chatMessages = JSON.parse(localStorage.getItem("groupChatMessages")) || [];
    const chatMessagesList = document.getElementById("chatMessages");
    chatMessagesList.innerHTML = '';

    // Check if there are messages
    if (chatMessages.length === 0) {
        chatMessagesList.innerHTML = '<li>No messages yet. Be the first to send a message!</li>';
        return;
    }

    // Add each message to the chat window
    chatMessages.forEach((message) => {
        const messageItem = document.createElement("LI");
        messageItem.innerHTML = `<strong>${message.username}:</strong> ${message.text} <span style="font-size: 10px; color: #ccc;">${message.timestamp}</span>`;
        chatMessagesList.appendChild(messageItem);
    });

    // Scroll to the bottom of the chat window after adding new messages
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        
        const currentUser = localStorage.getItem("currUser") || "Anonymous"; 
        const newMessage = {
            username: currentUser,
            text: messageText,
            timestamp: new Date().toLocaleTimeString()
        };

       
        const chatMessages = JSON.parse(localStorage.getItem("groupChatMessages")) || [];
        chatMessages.push(newMessage);

        
        localStorage.setItem("groupChatMessages", JSON.stringify(chatMessages));

     
        messageInput.value = '';

        // Refresh the chat window to show the new message
        displayGroupMessages();
    }
}

// Function to poll and update group chat messages 
function pollGroupMessages() {
    setInterval(displayGroupMessages, 2000);
}


window.addEventListener("load", function () {
    const sendButton = document.getElementById("send-button");

    
    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }

    // Initialize display functions when the page loads
    displayUsers();  
    displayGroupMessages();
    pollGroupMessages();  
});
