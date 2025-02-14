function signUp() {

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("pwd").value.trim();

    if (email && username && password && password) {
        let signObj = {

            email: email,
            username: username,
            password: password

        }
        let signJSON = JSON.stringify(signObj);
        localStorage.setItem(username,signJSON );
        alert("sucessfully logged in");s

        
    } else if (email === localStorage.getItem(email)) { 
        alert("User already existed");
    }

};











