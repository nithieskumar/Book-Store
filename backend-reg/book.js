const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());
const mongoURI = 'mongodb://localhost:27017/login';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
});
const Book = mongoose.model('Book', bookSchema);
app.post('/item', async (req, res) => {
    const { title, author, description, year, price } = req.body;
    if (!title || !author || !description || !year || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newBook = new Book({ title, author, description, year, price });
        await newBook.save();
        res.status(201).json({ message: 'Book saved successfully' });
    } catch (error) {
        console.error('Failed to save book', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
