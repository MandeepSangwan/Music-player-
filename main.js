const songs = [
    { name: "Blue Eyes", artist: "Honey Singh", src: "Blue Eyes.mp3", poster: "blue eyes.jpeg" },
    { name: "Brown Rang", artist: "Honey Singh", src: "Brown Rang Live YoutubeRip.mp3", poster: "Brown_rang_song.jpg" },
    { name: "Call Aundi", artist: "Honey Singh", src: "Call Aundi.mp3", poster: "call aundo.jpg" },
    { name: "Chaar Botal Vodka", artist: "Honey Singh", src: "Chaar Botal Vodka.mp3", poster: "chaar botal vodka.jpg" },
    { name: "Haye Mera Dil", artist: "Honey Singh", src: "Haye Mera Dil Remix.mp3", poster: "Haye Mera Dil.jpg" },
    { name: "Love Dose", artist: "Honey Singh", src: "Love Dose Extented.mp3", poster: "love dose.jpg" },
    { name: "Millionaire", artist: "Honey Singh", src: "Millionaire.mp3", poster: "millionaire.jpg" },
    { name: "Panga", artist: "Honey Singh", src: "Panga 8.mp3", poster: "panga.jpg" },
    { name: "Payal", artist: "Honey Singh", src: "Payal.mp3", poster: "Payal.jpeg" },
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const poster = document.getElementById("poster");
const songname = document.getElementById("songname");
const singer = document.getElementById("singer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volumeSlider = document.getElementById("volumeSlider");

// Add progress indicator dynamically
const progressIndicator = document.createElement("div");
progressIndicator.classList.add("progress-indicator");
progressBar.appendChild(progressIndicator);

// Load song details
function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.src;
    poster.src = song.poster;
    songname.textContent = song.name;
    singer.textContent = song.artist;
}

// Play/Pause function
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
}

// Next song function
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
}

// Previous song function
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
}

// Update progress bar and indicator together
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
   
});

// Seek functionality (ensures instant click accuracy)
progressContainer.addEventListener("click", (event) => {
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
});

// Volume control
volumeSlider.addEventListener("input", (event) => {
    audio.volume = event.target.value;
});

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Load first song
loadSong(currentSongIndex);
