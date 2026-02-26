const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const { protect } = require('../middleware/auth');

// Setup multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'book-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDFs are allowed!'));
        }
    }
});

// @desc    Get all books
// @route   GET /api/books
// @access  Public
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single book details
// @route   GET /api/books/:id
// @access  Private (Requires Token)
router.get('/:id', protect, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private
router.post('/', protect, upload.single('pdfFile'), async (req, res) => {
    try {
        const { title, author, category, description, coverUrl } = req.body;
        let pdfUrl = '';

        if (req.file) {
            pdfUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const book = await Book.create({
            title,
            author,
            category,
            description,
            coverUrl,
            pdfUrl,
        });

        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
