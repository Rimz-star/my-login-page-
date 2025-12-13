const loginBox=document.getElementById("loginBox");
const registerBox=document.getElementById("registerBox");

const loginForm=document.getElementById("loginForm");
const registerForm=document.getElementById("registerForm");

const loginUser=document.getElementById("loginUser");
const loginPass=document.getElementById("loginPass");

const regUser=document.getElementById("regUser");
const regPass=document.getElementById("regPass");
const regConfirm=document.getElementById("regConfirm");

const errorSound=document.getElementById("errorSound");
const successSound=document.getElementById("successSound");

// SWITCH
function showRegister(){ loginBox.classList.remove("active"); registerBox.classList.add("active"); }
function showLogin(){ registerBox.classList.remove("active"); loginBox.classList.add("active"); }

// PASSWORD TOGGLE
document.querySelectorAll(".toggle").forEach(icon=>{
    icon.addEventListener("click", ()=>{
        const input=icon.previousElementSibling;
        input.type=input.type==="password"?"text":"password";
        icon.classList.toggle("fa-eye"); icon.classList.toggle("fa-eye-slash");
    });
});

// HASH FUNCTION
async function hashText(text){
    const msgUint8=new TextEncoder().encode(text);
    const hashBuffer=await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray=Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b=>b.toString(16).padStart(2,'0')).join('');
}

// LOGIN
loginForm.addEventListener("submit", async e=>{
    e.preventDefault(); clearErrors(loginForm);
    const username=loginUser.value.trim();
    const password=loginPass.value.trim();
    let valid=true;
    if(!username){ setError(loginUser,"Username wajib diisi"); valid=false; }
    if(!password){ setError(loginPass,"Password wajib diisi"); valid=false; }
    if(!valid){ playError(); return; }

    const accounts=JSON.parse(localStorage.getItem("accounts")||"[]");
    const hashPass=await hashText(password);
    const account=accounts.find(acc=>acc.username===username && acc.password===hashPass);

    if(account){ playSuccess(); alert(`LOGIN BERHASIL 🚀\nSelamat datang, ${username}!`); loginForm.reset(); }
    else{ setError(loginUser,"Username atau password salah"); setError(loginPass,""); playError(); }
});

// REGISTER
registerForm.addEventListener("submit", async e=>{
    e.preventDefault(); clearErrors(registerForm);
    const username=regUser.value.trim();
    const password=regPass.value.trim();
    const confirm=regConfirm.value.trim();
    let valid=true;
    if(!username){ setError(regUser,"Username wajib diisi"); valid=false; }
    if(password.length<6){ setError(regPass,"Password minimal 6 karakter"); valid=false; }
    if(password!==confirm){ setError(regConfirm,"Password tidak sama"); valid=false; }
    if(!valid){ playError(); return; }

    let accounts=JSON.parse(localStorage.getItem("accounts")||"[]");
    if(accounts.find(acc=>acc.username===username)){ setError(regUser,"Username sudah terdaftar"); playError(); return; }

    const hashPass=await hashText(password);
    accounts.push({username,password:hashPass});
    localStorage.setItem("accounts",JSON.stringify(accounts));

    playSuccess(); alert(`AKUN BERHASIL DIBUAT 🎉\nUsername: ${username}`);
    registerForm.reset(); showLogin();
});

// HELPERS
function setError(input,message){ const group=input.parentElement; group.classList.add("input-error"); group.querySelector(".error").textContent=message; }
function clearErrors(form){ form.querySelectorAll(".input-group").forEach(g=>g.classList.remove("input-error")); form.querySelectorAll(".error").forEach(e=>e.textContent=""); }
function playError(){ errorSound.currentTime=0; errorSound.play(); }
function playSuccess(){ successSound.currentTime=0; successSound.play(); }
