import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import { getBooks } from '../redux/booksSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { categories, items, isLoading } = useSelector(state => state.books);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    // Show the newest books as popular books for demonstration purposes, or sort by highest rating but keep recent ones
    const popularBooks = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 pb-12">
            {/* Hero Section */}
            <div className="bg-zinc-900 border-b border-zinc-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Your Online Library</h1>
                    <p className="text-xl mb-8 text-zinc-400">Discover your next favorite book from our extensive collection.</p>
                    <Link to="/books" className="inline-block bg-zinc-100 text-zinc-900 px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
                        Start Browsing
                    </Link>
                </div>
            </div>

            {/* Categories */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map(category => (
                        <Link
                            key={category}
                            to={`/books/${category.toLowerCase()}`}
                            className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 transition-colors text-center group border border-zinc-800"
                        >
                            <span className="font-semibold text-zinc-300 group-hover:text-white">{category}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popular Books */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Latest Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {popularBooks.map(book => (
                        <div key={book._id || book.id} className="bg-zinc-900 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors border border-zinc-800">
                            <div className="h-48 overflow-hidden">
                                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2 text-white truncate">{book.title}</h3>
                                <p className="text-zinc-400 mb-4">{book.author}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-yellow-500 font-bold">★ {book.rating}</span>
                                    {book.pdfUrl && (
                                        <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline flex items-center mr-3">
                                            Read Book
                                        </a>
                                    )}
                                    <Link to={`/book/${book._id || book.id}`} className="text-zinc-300 font-semibold hover:text-white hover:underline flex items-center">
                                        View Details <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
