const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const currentTrackName = document.getElementById('currentTrackName');
const currentArtistName = document.getElementById('currentArtistName');
const currentTrackArt = document.getElementById('currentTrackArt');
// const likedSongsPlaylist = document.querySelector('.playlist-item[data-playlist="liked-songs"]');
// const likedSongsPage = document.getElementById('likedSongsPage');
// const mainContent = document.querySelector('.main-content');
// const likedSongsList = document.getElementById('likedSongsList');

// const likedSongs = [
//     { title: "Missing Textures - Super Slo...", artist: "NIVEK FFORHS", album: "Missing Textures", duration: "3:28" },
//     { title: "Tell më", artist: "Yeat", album: "2093 (P2)", duration: "4:04" },
//     { title: "Night City", artist: "REL Artemis Delta", album: "Cyberpunk 2077: Ra...", duration: "3:13" },
//     { title: "Tanks", artist: "Volker Bertelmann", album: "All Quiet On The We...", duration: "1:46" }
// ];

// function showLikedSongs() {
//     mainContent.style.display = 'none';
//     likedSongsPage.style.display = 'block';
//     renderLikedSongs();
// }

// function renderLikedSongs() {
//     likedSongsList.innerHTML = '';
//     likedSongs.forEach((song, index) => {
//         const songElement = document.createElement('div');
//         songElement.classList.add('song-item');
//         songElement.innerHTML = `
//             <span>${index + 1}</span>
//             <div>
//                 <div>${song.title}</div>
//                 <div>${song.artist}</div>
//             </div>
//             <div>${song.album}</div>
//             <div>Date added</div>
//             <div>${song.duration}</div>
//         `;
//         likedSongsList.appendChild(songElement);
//     });
// }

// likedSongsPlaylist.addEventListener('click', showLikedSongs);


function showLikedSongs() {
    const mainContent = document.querySelector('.main-content');
    const likedSongsPage = document.getElementById('likedSongsPage');
    const likedSongsList = document.getElementById('likedSongsList');
    
    if (mainContent && likedSongsPage && likedSongsList) {
        mainContent.style.display = 'none';
        likedSongsPage.style.display = 'block';
        renderLikedSongs();
    } else {
        console.error('One or more elements are missing in the HTML.');
    }
}

function renderLikedSongs() {
    const likedSongsList = document.getElementById('likedSongsList');
    if (likedSongsList) {
        likedSongsList.innerHTML = '';
        likedSongs.forEach((song, index) => {
            const songElement = document.createElement('div');
            songElement.classList.add('song-item');
            songElement.innerHTML = `
                <span>${index + 1}</span>
                <div>
                    <div>${song.title}</div>
                    <div>${song.artist}</div>
                </div>
                <div>${song.album}</div>
                <div>Date added</div>
                <div>${song.duration}</div>
            `;
            likedSongsList.appendChild(songElement);
        });
    } else {
        console.error('Liked songs list element is missing in the HTML.');
    }
}

// Ensure the event listener is set correctly
const likedSongsPlaylist = document.querySelector('.playlist-item[data-playlist="liked-songs"]');
if (likedSongsPlaylist) {
    likedSongsPlaylist.addEventListener('click', showLikedSongs);
} else {
    console.error('Liked songs playlist element is missing in the HTML.');
}

// Add a back button functionality
const backButton = document.querySelector('.nav-btn');
backButton.addEventListener('click', () => {
    likedSongsPage.style.display = 'none';
    mainContent.style.display = 'block';
});

const playlist = [
    { name: "Armada", artist: "Hans Zimmer", src: "armada.mp3", art: "path/to/dune-cover.jpg" },
    { name: "Track 2", artist: "Artist 2", src: "https://example.com/track2.mp3", art: "path/to/track2-cover.jpg" },
    // Add more tracks
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;
    currentTrackName.textContent = track.name;
    currentArtistName.textContent = track.artist;
    currentTrackArt.src = track.art;
    audioPlayer.load(); // Ensure the new source is loaded
}

function playPause() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
    } else {
        audioPlayer.play().catch(e => console.error("Playback failed:", e));
        isPlaying = true;
        playPauseBtn.innerHTML = '<span class="material-icons">pause</span>';
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play().catch(e => console.error("Playback failed:", e));
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play().catch(e => console.error("Playback failed:", e));
    }
}

function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTime.textContent = formatTime(audioPlayer.currentTime);
        totalTime.textContent = formatTime(audioPlayer.duration);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);

// Initialize
loadTrack(currentTrackIndex);

// Make playlist items clickable
document.querySelectorAll('.playlist-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        isPlaying = false; // Reset playing state
        playPause(); // Start playing the new track
    });
});

// Error handling for audio playback
audioPlayer.addEventListener('error', (e) => {
    console.error("Audio playback error:", e);
    alert("There was an error playing the audio. Please check the audio source.");
});