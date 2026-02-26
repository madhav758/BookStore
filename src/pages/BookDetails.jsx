import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBook } from '../redux/booksSlice';
import { ArrowLeft, Lock, BookOpen } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    // Note: To keep this simple we will just find the book in the local state if it already exists from BrowseBooks. 
    // The backend `getBook` thunk was created, but because the book's initial state holds the list, 
    // it's easier to find it in the state first. Let's add the getBook dispatch anyway to show we test the protected route.

    // We fetch from the item list. To make it truly test the API, let's also fetch it.
    useEffect(() => {
        if (user) {
            dispatch(getBook(id));
        }
    }, [dispatch, id, user]);

    // Use local items since getBooks populates it.
    const book = useSelector(state => state.books.items.find(b => b._id === id || b.id === parseInt(id)));

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center container mx-auto px-4 py-20 text-center">
                <Lock className="h-16 w-16 text-zinc-600 mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-white">Authentication Required</h2>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">You must be logged in to view the detailed information and reviews for this book.</p>
                <div className="flex gap-4 justify-center">
                    <Link to="/login" className="px-6 py-2 bg-zinc-100 text-zinc-900 font-medium rounded-lg hover:bg-white transition-colors">Log In</Link>
                    <Link to="/register" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-medium rounded-lg hover:bg-zinc-800 transition-colors">Create Account</Link>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Loading Book...</h2>
                <Link to="/books" className="text-zinc-400 hover:text-white hover:underline transition-colors">Return to Browse Books</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Browse
            </button>

            <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/3 h-96 md:h-auto overflow-hidden bg-zinc-800">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>

                <div className="md:w-2/3 p-8 md:p-12">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm font-semibold mb-2">
                                {book.category}
                            </span>
                            <h1 className="text-4xl font-bold mb-2 text-white">{book.title}</h1>
                            <p className="text-xl text-zinc-400 font-medium">{book.author}</p>
                        </div>
                        <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
                            <span className="text-yellow-500 font-bold text-2xl">★ {book.rating}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-zinc-400 leading-relaxed mb-8">
                        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                        <p>{book.description}</p>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        {book.pdfUrl && (
                            <button
                                onClick={() => window.open(book.pdfUrl, '_blank', 'noopener,noreferrer')}
                                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/20 flex items-center"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Read Book
                            </button>
                        )}
                        <button className="px-8 py-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold hover:bg-white transition-colors">
                            Borrow Book
                        </button>
                        <button className="px-8 py-3 border border-zinc-700 text-zinc-300 rounded-xl font-bold hover:bg-zinc-800 transition-colors">
                            Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
