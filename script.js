/* AUTO REDIRECT */
if (localStorage.getItem("sessionUser")) {
    location.href = "dashboard.html";
}

/* ELEMENTS */
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const regUser = document.getElementById("regUser");
const regPass = document.getElementById("regPass");
const regConfirm = document.getElementById("regConfirm");

/* SWITCH */
function showRegister(){ loginBox.classList.remove("active"); registerBox.classList.add("active"); }
function showLogin(){ registerBox.classList.remove("active"); loginBox.classList.add("active"); }

/* TOGGLE PASSWORD */
document.querySelectorAll(".toggle").forEach(icon=>{
    icon.onclick = () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye-slash");
    };
});

/* HASH */
async function hashPassword(pass, salt){
    const data = new TextEncoder().encode(pass + salt);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

/* LOGIN */
loginForm.onsubmit = async e => {
    e.preventDefault();
    const u = loginUser.value.trim();
    const p = loginPass.value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(x=>x.username===u);
    if(!user) {
        document.getElementById("errorSound").play();
        return alert("Login gagal");
    }

    const h = await hashPassword(p, user.salt);
    if(h !== user.password) {
        document.getElementById("errorSound").play();
        return alert("Login gagal");
    }

    localStorage.setItem("sessionUser", u);
    document.getElementById("successSound").play();
    location.href = "dashboard.html";
};

/* REGISTER */
registerForm.onsubmit = async e => {
    e.preventDefault();
    const u = regUser.value.trim();
    const p = regPass.value.trim();
    const c = regConfirm.value.trim();

    if(p.length < 6 || p !== c) {
        document.getElementById("errorSound").play();
        return alert("Password error");
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if(users.find(x=>x.username===u)) {
        document.getElementById("errorSound").play();
        return alert("Username sudah ada");
    }

    const salt = crypto.randomUUID();
    const hash = await hashPassword(p, salt);

    users.push({ username:u, password:hash, salt });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("successSound").play();
    alert("Register sukses");
    showLogin();
};
