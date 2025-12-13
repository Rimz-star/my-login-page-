// ===== DOM ELEMENTS =====
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");

const regUser = document.getElementById("regUser");
const regPass = document.getElementById("regPass");
const regConfirm = document.getElementById("regConfirm");

const errorSound = document.getElementById("errorSound");
const successSound = document.getElementById("successSound");

// ===== SWITCH FORM =====
function showRegister() {
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
}

function showLogin() {
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
}

// ===== TOGGLE PASSWORD =====
document.querySelectorAll(".toggle").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    });
});

// ===== LOGIN =====
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors(loginForm);

    let valid = true;

    if (!loginUser.value.trim()) {
        setError(loginUser, "Username wajib diisi");
        valid = false;
    }

    if (!loginPass.value.trim()) {
        setError(loginPass, "Password wajib diisi");
        valid = false;
    }

    if (!valid) {
        playError();
    } else {
        playSuccess();
        alert("LOGIN BERHASIL 🚀");
    }
});

// ===== REGISTER =====
registerForm.addEventListener("submit", e => {
    e.preventDefau
