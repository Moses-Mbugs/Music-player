document.addEventListener('DOMContentLoaded', () => {
    let songs = [];
    let currentSongIndex = 0;

    const audio = document.getElementById('audio');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    const songPhoto = document.getElementById('song-photo');
    const playPauseButton = document.getElementById('play-pause');

    function loadSongs() {
        fetch('songs.php')
            .then(response => response.json())
            .then(data => {
                songs = data;
                loadSong(songs[currentSongIndex]);
            });
    }

    function loadSong(song) {
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        songPhoto.src = song.photo;
        audio.src = song.src;
        audio.load();
    }

    function playSong() {
        audio.play();
        playPauseButton.className = 'fa-solid fa-pause';
    }

    function pauseSong() {
        audio.pause();
        playPauseButton.className = 'fa-solid fa-play';
    }

    function playPause() {
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function shuffleSong() {
        currentSongIndex = Math.floor(Math.random() * songs.length);
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    document.getElementById('prev').addEventListener('click', prevSong);
    document.getElementById('next').addEventListener('click', nextSong);
    document.getElementById('play-pause').addEventListener('click', playPause);
    document.getElementById('shuffle').addEventListener('click', shuffleSong);

    loadSongs();
});
