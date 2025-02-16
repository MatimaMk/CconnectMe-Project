function login() {
  const loginUsername = document.getElementById("username").value.trim();
  const loginPassword = document.getElementById("pwd").value.trim();

  if (!loginUsername || !loginPassword) {
    alert("Please enter both username and password");
    return;
  }

  const storedUser = localStorage.getItem(loginUsername);
  if (storedUser) {

    const user = JSON.parse(storedUser);
    if (user.password === loginPassword) {

      window.location.href = "UserList.html";
      alert("Login successful!");
      localStorage.setItem('currUser', loginUsername);
     
     

    } else {

      alert("Incorrect password. Please try again");
    
    }

  } else {

    alert("User not found. Please register first");
   
  }
}

