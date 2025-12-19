/* AUTO REDIRECT */
if (localStorage.getItem("sessionUser")) {
    location.href = "dashboard.html";
}

/* ELEMENTS */
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

/* SWITCH */
function showRegister() {
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
}
function showLogin() {
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
}

/* TOGGLE PASSWORD */
document.querySelectorAll(".toggle").forEach(icon => {
    icon.onclick = () => {
        const input = document.getElementById(icon.dataset.target);
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye-slash");
    };
});

/* MUSIC PLAYER */
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const lyricsBox = document.getElementById("lyrics");

let playing = false;
let lyricIndex = 0;

/* BEAT SYNC DATA */
const lyricsData = [
    { time: 0.5, text: "SYSTEM ONLINE" },
    { time: 2.0, text: "SECURE CONNECTION" },
    { time: 4.0, text: "AUTHORIZATION CHECK" },
    { time: 6.0, text: "ACCESS GRANTED" },
    { time: 9.0, text: "WELCOME USER" },
    { time: 12.0, text: "CYBER AUTH ACTIVE" }
];

musicBtn.onclick = () => {
    if (!playing) {
        bgMusic.play();
        musicIcon.classList.replace("fa-play", "fa-pause");
    } else {
        bgMusic.pause();
        musicIcon.classList.replace("fa-pause", "fa-play");
    }
    playing = !playing;
};

bgMusic.addEventListener("timeupdate", () => {
    if (lyricIndex >= lyricsData.length) return;

    if (bgMusic.currentTime >= lyricsData[lyricIndex].time) {
        const line = document.createElement("div");
        line.className = "lyric-line";
        line.textContent = lyricsData[lyricIndex].text;
        lyricsBox.appendChild(line);

        setTimeout(() => line.remove(), 3000);
        lyricIndex++;
    }
});

bgMusic.onended = () => {
    playing = false;
    lyricIndex = 0;
    lyricsBox.innerHTML = "";
    musicIcon.classList.replace("fa-pause", "fa-play");
};
