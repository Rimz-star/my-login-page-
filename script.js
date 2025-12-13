const errorSound = document.getElementById("errorSound");
const successSound = document.getElementById("successSound");

function showRegister() {
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
}

function showLogin() {
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
}

// Toggle Password
document.querySelectorAll(".toggle").forEach(icon => {
    icon.onclick = () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    };
});

// LOGIN
loginForm.onsubmit = e => {
    e.preventDefault();
    clear(loginForm);

    let valid = true;
    if (!loginUser.value) error(loginUser, "Username wajib diisi"), valid = false;
    if (!loginPass.value) error(loginPass, "Password wajib diisi"), valid = false;

    if (!valid) errorSound.play();
    else successSound.play(), alert("LOGIN BERHASIL 🚀");
};

// REGISTER
registerForm.onsubmit = e => {
    e.preventDefault();
    clear(registerForm);

    let valid = true;
    if (!regUser.value) error(regUser, "Username wajib diisi"), valid = false;
    if (regPass.value.length < 6) error(regPass, "Min 6 karakter"), valid = false;
    if (regPass.value !== regConfirm.value)
        error(regConfirm, "Password tidak sama"), valid = false;

    if (!valid) errorSound.play();
    else {
        successSound.play();
        alert("AKUN BERHASIL DIBUAT 🎉");
        showLogin();
    }
};

function error(input, msg) {
    const group = input.parentElement;
    group.classList.add("input-error");
    group.querySelector(".error").textContent = msg;
}

function clear(form) {
    form.querySelectorAll(".input-group").forEach(g => g.classList.remove("input-error"));
    form.querySelectorAll(".error").forEach(e => e.textContent = "");
}
