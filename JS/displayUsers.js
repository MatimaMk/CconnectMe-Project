function displayUsers() {

    const users = [];

    for (let i = 0; i < localStorage.length; i++) {

      const username = localStorage.key(i);
      const user = JSON.parse(localStorage.getItem(username));
      users.push(user);

    }
  
    const userList = document.getElementById("conList");
   
  
    users.forEach((user) => {
        
      const listItem = document.createElement("LI");
      listItem.innerHTML = `<i class="fa fa-user" aria-hidden="true" style="margin-right: 10px;"></i>${user.username}`;
      userList.appendChild(listItem);
    });
  }
  
  window.addEventListener("load", displayUsers);
