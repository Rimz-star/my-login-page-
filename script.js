const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const errorSound = document.getElementById("errorSound");
const successSound = document.getElementById("successSound");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll(".input-group").forEach(el => el.classList.remove("input-error"));

    if (username.value.trim() === "") {
        setError(username, "Username wajib diisi");
        valid = false;
    }

    if (password.value.trim() === "") {
        setError(password, "Password wajib diisi");
        valid = false;
    } else if (password.value.length < 6) {
        setError(password, "Password minimal 6 karakter");
        valid = false;
    }

    if (!valid) {
        errorSound.currentTime = 0;
        errorSound.play();
    } else {
        successSound.play();
        setTimeout(() => {
            alert("ACCESS GRANTED 🚀");
        }, 300);
    }
});

function setError(input, message) {
    const group = input.parentElement;
    group.classList.add("input-error");
    group.querySelector(".error").textContent = message;
}

// SHOW / HIDE PASSWORD
togglePassword.addEventListener("click", function () {
    password.type = password.type === "password" ? "text" : "password";
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});
