const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Book = require('./models/Book');

dotenv.config();

const books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        description: "A novel set in the Roaring Twenties that tells the story of Jay Gatsby's unrequited love for Daisy Buchanan.",
        rating: 4.5,
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        description: "A novel about the serious issues of rape and racial inequality, but it is also full of warmth and humor.",
        rating: 4.8,
        coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "1984",
        author: "George Orwell",
        category: "Sci-Fi",
        description: "A dystopian social science fiction novel and cautionary tale about the future.",
        rating: 4.6,
        coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        description: "A book that surveys the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.",
        rating: 4.7,
        coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        category: "Sci-Fi",
        description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
        rating: 4.9,
        coverUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800"
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Book.deleteMany();
        console.log('Books deleted');

        await Book.insertMany(books);
        console.log('Books added');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
