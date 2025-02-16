
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesList = document.getElementById('messages');
    const userNameElement = document.getElementById('user-name');
    const typingStatus = document.getElementById('typing-status');

    let messages = [];
    let userName = localStorage.getItem('username');
    let friendName = localStorage.getItem('friendName');
    let typingTimeout = null;


    userNameElement.textContent = userName;

    if (localStorage.getItem('messages')) {

        messages = JSON.parse(localStorage.getItem('messages'));
        displayMessages();
    }

    sendButton.addEventListener('click', () => {

        const message = messageInput.value.trim();

        if (message) {

            const timestamp = new Date().toLocaleTimeString();

            messages.push({ user: userName, message: message, timestamp: timestamp });
            localStorage.setItem('messages', JSON.stringify(messages));
            displayMessages();
            messageInput.value = '';

        }
    });

    messageInput.addEventListener('input', () => {

        if (typingTimeout) {

            clearTimeout(typingTimeout);
        }

        typingTimeout = setTimeout(() => {

            typingStatus.textContent = '';
        }, 2000);

        typingStatus.textContent = 'Typing...';
    });

    messageInput.addEventListener('keypress', (e) => {

        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function displayMessages() {
        messagesList.innerHTML = '';

        messages.forEach((message, index) => {

            const messageElement = document.createElement('LI');
            if (message.user === userName) {

                messageElement.classList.add('you');

            } else {

                messageElement.classList.add('friend');
            }
            const messageText = document.createElement('SPAN');
            messageText.textContent = `${message.user}: ${message.message}`;


            const timestampText = document.createElement('SPAN');
            timestampText.style.fontSize = '12px';
            timestampText.style.color = '#666';
            timestampText.textContent = message.timestamp;
            messageElement.appendChild(messageText);
            messageElement.appendChild(document.createElement('BR'));
            messageElement.appendChild(timestampText);
            messagesList.appendChild(messageElement);
        });

    }
