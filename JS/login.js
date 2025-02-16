function login() {

    const loginUsername = document.getElementById("username").value.trim();
    const loginPassword = document.getElementById("pwd").value.trim();

    if (username && password) {

        const storedUser = localStorage.getItem(username);

        if (storedUser) {

            const storedUserJSON = JSON.parse(storedUser);

            if (storedUserJSON.password === loginPassword) {

                alert("Login successful!");
                window.location.href = 'Pages\UserList.html';

            } else {
                
                alert("Incorrect details. please enter correct Details");
            }
        }

    }
}