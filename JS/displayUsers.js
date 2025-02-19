function displayUsers() {
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const username = localStorage.key(i);
    // Check if it's not the current user
    if (username !== "currUser") {
      const user = JSON.parse(localStorage.getItem(username));
      if (user && user.username) {
        users.push(user);  // Add user if the data is valid
      }
    }
  }

  const userList = document.getElementById("conList");
  if (userList) {
    userList.innerHTML = '';  // Clear the list before appending new items

    if (users.length === 0) {
      userList.innerHTML = '<p>No users available</p>'; // Display if no users are found
    } else {
      users.forEach((user) => {
        const listItem = document.createElement("LI");
        listItem.innerHTML = `<i class="fa fa-user" aria-hidden="true" style="margin-right: 10px;"></i>${user.username}`;
        listItem.dataset.username = user.username;
        
        // Add event listener to each list item to start private chat
        listItem.addEventListener("click", () => startPrivateChat(user.username));

        userList.appendChild(listItem);
      });
    }
  } else {
    console.error('The user list element with ID "conList" is not found in the HTML.');
  }
}

function startPrivateChat(username) {
  // Check if currUser exists in localStorage
  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    window.location.href = `chatbox.html?user=${username}&currUser=${currUser}`;
  } else {
    console.error('Current user not found in localStorage.');
  }
}

window.addEventListener("load", displayUsers);
