const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const mongoURI = 'mongodb://localhost:27017/login';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String
});

const Book = mongoose.model('Book', bookSchema);
app.get('/item', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
