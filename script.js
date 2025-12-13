// AUTO REDIRECT JIKA SUDAH LOGIN
if (localStorage.getItem("loggedInUser")) {
    window.location.href = "dashboard.html";
}

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

function showRegister(){ loginBox.classList.remove("active"); registerBox.classList.add("active"); }
function showLogin(){ registerBox.classList.remove("active"); loginBox.classList.add("active"); }

// PASSWORD TOGGLE
document.querySelectorAll(".toggle").forEach(icon=>{
    icon.onclick = ()=>{
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    }
});

// HASH + SALT
async function hashPassword(password, salt) {
    const data = new TextEncoder().encode(password + salt);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

// RATE LIMIT
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 60000;

function checkLock(){
    const d = JSON.parse(localStorage.getItem("loginAttempts") || "{}");
    if(d.lockUntil && Date.now() < d.lockUntil){
        alert("Login dikunci sementara");
        return true;
    }
    return false;
}

function failAttempt(){
    let d = JSON.parse(localStorage.getItem("loginAttempts") || "{}");
    d.count = (d.count || 0) + 1;
    if(d.count >= MAX_ATTEMPTS) d.lockUntil = Date.now() + LOCK_TIME;
    localStorage.setItem("loginAttempts", JSON.stringify(d));
}

// LOGIN
loginForm.onsubmit = async e=>{
    e.preventDefault();
    if(checkLock()) return;

    const u = loginUser.value.trim();
    const p = loginPass.value.trim();

    const accs = JSON.parse(localStorage.getItem("accounts")||"[]");
    const acc = accs.find(a=>a.username===u);
    if(!acc){ failAttempt(); playError(); return; }

    const hash = await hashPassword(p, acc.salt);
    if(hash !== acc.password){ failAttempt(); playError(); return; }

    localStorage.setItem("loggedInUser", u);
    localStorage.setItem("loginTime", Date.now());
    playSuccess();
    setTimeout(()=>location.href="dashboard.html",800);
};

// REGISTER
registerForm.onsubmit = async e=>{
    e.preventDefault();

    const u = regUser.value.trim();
    const p = regPass.value.trim();
    if(p.length < 6) return playError();

    let accs = JSON.parse(localStorage.getItem("accounts")||"[]");
    if(accs.find(a=>a.username===u)) return playError();

    const salt = crypto.randomUUID();
    const hash = await hashPassword(p, salt);
    accs.push({username:u,password:hash,salt});
    localStorage.setItem("accounts",JSON.stringify(accs));

    playSuccess();
    showLogin();
};

function playError(){ errorSound.currentTime=0; errorSound.play(); }
function playSuccess(){ successSound.currentTime=0; successSound.play(); }
