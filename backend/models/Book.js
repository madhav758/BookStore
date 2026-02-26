const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
    },
    category: {
        type: String,
        required: [true, 'Please specify a category'],
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    coverUrl: {
        type: String,
    },
    pdfUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);
