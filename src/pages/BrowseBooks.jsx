import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { getBooks } from '../redux/booksSlice';

const BrowseBooks = () => {
    const { category } = useParams();
    const dispatch = useDispatch();

    const { items: books, isLoading, isError, message } = useSelector(state => state.books);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                <p>Error loading books: {message}</p>
            </div>
        );
    }

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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-2 focus:ring-zinc-600 focus:border-transparent outline-none transition-all placeholder:text-zinc-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBooks.map(book => (
                        <div key={book._id || book.id} className="bg-zinc-900 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors border border-zinc-800 flex flex-col">
                            <div className="h-48 overflow-hidden bg-zinc-800">
                                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">{book.category}</div>
                                <h3 className="font-bold text-lg mb-1 leading-tight text-white">{book.title}</h3>
                                <p className="text-zinc-400 text-sm mb-3">{book.author}</p>
                                <div className="mt-auto flex justify-between items-center pt-3 border-t border-zinc-800">
                                    <span className="text-yellow-500 font-bold text-sm">★ {book.rating}</span>
                                    <div className="flex gap-2">
                                        {book.pdfUrl && (
                                            <a
                                                href={book.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                                            >
                                                Read
                                            </a>
                                        )}
                                        <Link
                                            to={`/book/${book._id || book.id}`}
                                            className="px-4 py-2 bg-zinc-100 text-zinc-900 text-sm font-medium rounded-lg hover:bg-white transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-zinc-500 text-xl">No books found matching your criteria.</p>
                    <Link to="/books" className="text-zinc-300 hover:text-white hover:underline mt-2 inline-block">View all books</Link>
                </div>
            )}
        </div>
    );
};

export default BrowseBooks;
