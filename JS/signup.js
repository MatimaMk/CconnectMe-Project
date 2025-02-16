function signUp() {
    
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("pwd").value.trim();
  
    if (email && username && password) {
      let signObj = {
        email: email,
        username: username,
        password: password
      }
 
      
        // store to the local storage
      let signJSON = JSON.stringify(signObj);
      localStorage.setItem(username, signJSON);
      alert("Successfully signed up");

    } else if (email === localStorage.getItem(email)) { 
        alert("User already existed");
    }

};











