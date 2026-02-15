import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const { categories, items } = useSelector(state => state.books);
    const popularBooks = [...items].sort((a, b) => b.rating - a.rating).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Your Online Library</h1>
                    <p className="text-xl mb-8 text-blue-100">Discover your next favorite book from our extensive collection.</p>
                    <Link to="/books" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
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
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group border border-gray-100"
                        >
                            <span className="font-semibold text-gray-700 group-hover:text-blue-600">{category}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popular Books */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Popular Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {popularBooks.map(book => (
                        <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2 truncate">{book.title}</h3>
                                <p className="text-gray-600 mb-4">{book.author}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-yellow-500 font-bold">★ {book.rating}</span>
                                    <Link to={`/book/${book.id}`} className="text-blue-600 font-semibold hover:underline flex items-center">
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
