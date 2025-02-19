
function displayUsers() {
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const userData = localStorage.getItem(localStorage.key(i));
    try {
      const parsedData = JSON.parse(userData);
      if (parsedData.username && parsedData.username !== localStorage.getItem("currUser")) {
        users.push(parsedData.username);
      }
    } catch (error) {
      console.log("Error parsing user data:", error.message);
    }
  }
  const userList = document.getElementById("conList");
  if (userList) {
    userList.innerHTML = '';

    // Clear the list before appending new items
    if (users.length === 0) {
      userList.innerHTML = '<p>No users available</p>';
    

    } else {

      users.forEach((user) => {
        const listItem = document.createElement("LI");
        listItem.innerHTML = `<i class="fa fa-user" aria-hidden="true" style="margin-right: 10px;"></i>${user}`;
        listItem.dataset.username = user;
        // Add event listener to each list item to start private chat
        listItem.addEventListener("click", () => startPrivateChat(user));
        userList.appendChild(listItem);
      });
    }
  } else {
    console.log('The user list element with ID "conList" is not found in the HTML.');
  }
}

function startPrivateChat(username) {
  // Check if currUser exists in localStorage

  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    window.location.href = `chatbox.html?user=${username}&currUser=${currUser}`;
  } else {
    console.log('Current user not found in localStorage.');
  }
}

window.addEventListener("load", displayUsers);