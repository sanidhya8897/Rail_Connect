let isLoginMode = false;

    // Get users from localStorage or create empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    function saveUsers() {
      localStorage.setItem("users", JSON.stringify(users));
    }

    function toggleForm() {
      const title = document.getElementById("form-title");
      const btn = document.querySelector("button");
      const switchText = document.querySelector(".switch");

      isLoginMode = !isLoginMode;

      if (isLoginMode) {
        title.textContent = "Login";
        btn.textContent = "Login";
        switchText.textContent = "Don't have an account? Register";
        btn.setAttribute("onclick", "loginUser()");
        document.getElementById("username").style.display = "none";
      } else {
        title.textContent = "Register";
        btn.textContent = "Register";
        switchText.textContent = "Already have an account? Login";
        btn.setAttribute("onclick", "registerUser()");
        document.getElementById("username").style.display = "block";
      }
    }

    function registerUser() {
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !email || !password) {
        alert("Please fill all fields!");
        return;
      }

      if (users.some(u => u.email === email)) {
        alert("User already exists. Please login!");
        return;
      }

      users.push({ username, email, password });
      saveUsers();

      alert("Registration successful! You can now login.");
      toggleForm();
      console.log("Current users:", users);
    }

    function loginUser() {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        alert(`Welcome back, ${user.username}!`);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // Redirect to booking page
        window.location.href = "booking.html";
      } else {
        alert("Invalid email or password!");
      }
    }

    // Optional: check if user is already logged in
    window.onload = () => {
      const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedUser) {
        alert(`Welcome back, ${loggedUser.username}! Redirecting to booking page...`);
         window.location.href = "booking.html";
      }
    };