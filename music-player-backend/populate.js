// populate.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/music_player', { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    src: String,
    img: String
});

const Song = mongoose.model('Song', songSchema);

const songs = [
    { title: 'Song 1', artist: 'Artist 1', src: '/path/to/song1.mp3', img: '/path/to/image1.jpg' },
    { title: 'Song 2', artist: 'Artist 2', src: '/path/to/song2.mp3', img: '/path/to/image2.jpg' }
    // Add more songs here
];

Song.insertMany(songs)
    .then(() => {
        console.log('Songs added');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
    });
