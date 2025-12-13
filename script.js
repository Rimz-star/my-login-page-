const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Reset error
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Validasi username
    if (username.value.trim() === "") {
        username.nextElementSibling.nextElementSibling.textContent = "Username wajib diisi";
        valid = false;
    }

    // Validasi password
    if (password.value.trim() === "") {
        password.nextElementSibling.nextElementSibling.textContent = "Password wajib diisi";
        valid = false;
    } else if (password.value.length < 6) {
        password.nextElementSibling.nextElementSibling.textContent = "Password minimal 6 karakter";
        valid = false;
    }

    if (valid) {
        alert("Login berhasil (dummy) 🚀");
        // redirect / kirim ke backend
        // window.location.href = "dashboard.html";
    }
});
