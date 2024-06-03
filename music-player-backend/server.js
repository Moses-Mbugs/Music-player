// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music_player', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define song schema
const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    src: String,
    img: String
});

const Song = mongoose.model('Song', songSchema);

// Routes
app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/songs', async (req, res) => {
    const newSong = new Song(req.body);
    try {
        await newSong.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Music Player API');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
