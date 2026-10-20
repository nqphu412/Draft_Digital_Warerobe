/////////////// Login - Register page
// Change between Login and Register
// Make sure when change mode, all old data in the previous form should be deleted
const changeModeSection = document.querySelector(".auth-change-mode-section");
const changeModeButton = changeModeSection.querySelector(
  ".auth-change-mode-button",
);
const register_card = document.querySelector(".register-card");
const login_card = document.querySelector(".login-card");

changeModeButton.addEventListener("click", function () {
  if (register_card.classList.contains("hidden")) {
    // Moving from login mode to register mode
    login_card.querySelector("form").reset();

    register_card.classList.remove("hidden");
    login_card.classList.add("hidden");

    changeModeSection.querySelector("p").innerHTML = "Already had account?";
    changeModeButton.innerHTML = "Go to login";
  } else {
    // Moving from register mode to login mode
    register_card.querySelector("form").reset();

    login_card.classList.remove("hidden");
    register_card.classList.add("hidden");

    changeModeSection.querySelector("p").innerHTML = "New to Digital Warerobe";
    changeModeButton.innerHTML = "Create an account";
  }
});

// Create account and save in User table schema
const registerForm = document.getElementById("register-form");
const registerMessage = document.querySelector(".register-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document
    .getElementById("register-username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-confirm-password",
  ).value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();
    registerMessage.textContent = data.message;

    if (response.ok) {
      registerForm.reset();
    }
  } catch (error) {
    console.log("Register failed:", error);
    registerMessage.textContent = "Server not connected.";
  }
});

// Login into account and redirect to mainPage
const loginForm = document.getElementById("login-form");
const loginMessage = document.querySelector(".login-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document
    .getElementById("login-username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    loginMessage.textContent = data.message;

    if (response.ok) {
      loginForm.reset();
      window.location.href = "./draft.html";
    }
  } catch (error) {
    console.log("Login failed:", error);
    loginMessage.textContent = "Server not connected.";
  }
});
