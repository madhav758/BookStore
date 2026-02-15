import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Search } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
                        <BookOpen className="w-6 h-6" />
                        <span>BookStore</span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/books" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Browse Books
                        </Link>
                        <Link to="/add-book" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            <PlusCircle className="w-4 h-4" />
                            <span>Add Book</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
