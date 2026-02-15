import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = useSelector(state => state.books.items.find(b => b.id === parseInt(id)));

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
                <Link to="/books" className="text-blue-600 hover:underline">Return to Browse Books</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Browse
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                <div className="md:w-1/3 h-96 md:h-auto overflow-hidden bg-gray-100">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>

                <div className="md:w-2/3 p-8 md:p-12">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                                {book.category}
                            </span>
                            <h1 className="text-4xl font-bold mb-2 text-gray-900">{book.title}</h1>
                            <p className="text-xl text-gray-600 font-medium">{book.author}</p>
                        </div>
                        <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-100">
                            <span className="text-yellow-500 font-bold text-2xl">★ {book.rating}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p>{book.description}</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Borrow Book
                        </button>
                        <button className="px-8 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                            Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
