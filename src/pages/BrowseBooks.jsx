import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';

const BrowseBooks = () => {
    const { category } = useParams();
    const books = useSelector(state => state.books.items);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBooks = books.filter(book => {
        const matchesCategory = category ? book.category.toLowerCase() === category.toLowerCase() : true;
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Books` : 'All Books'}</h1>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBooks.map(book => (
                        <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                            <div className="h-48 overflow-hidden bg-gray-200">
                                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">{book.category}</div>
                                <h3 className="font-bold text-lg mb-1 leading-tight">{book.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                                    <span className="text-yellow-500 font-bold text-sm">★ {book.rating}</span>
                                    <Link
                                        to={`/book/${book.id}`}
                                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl">No books found matching your criteria.</p>
                    <Link to="/books" className="text-blue-600 hover:underline mt-2 inline-block">View all books</Link>
                </div>
            )}
        </div>
    );
};

export default BrowseBooks;
