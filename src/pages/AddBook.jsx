import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../redux/booksSlice';
import { PlusCircle } from 'lucide-react';

const AddBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        coverUrl: ''
    });

    const [errors, setErrors] = useState({});

    const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography"];

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.author.trim()) newErrors.author = "Author is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.coverUrl.trim()) newErrors.coverUrl = "Cover URL is required";
        else if (!/^https?:\/\/.+/.test(formData.coverUrl)) newErrors.coverUrl = "Please enter a valid URL";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(addBook(formData));
            navigate('/books');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 px-8 py-6">
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <PlusCircle className="mr-2" />
                        Add New Book
                    </h1>
                    <p className="text-blue-100">Enter the details of the new book to add to the library.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-all`}
                            placeholder="e.g. The Great Gatsby"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.author ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-all`}
                                placeholder="author name"
                            />
                            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.category ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-all bg-white`}
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input
                            type="url"
                            name="coverUrl"
                            value={formData.coverUrl}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.coverUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-all`}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.coverUrl && <p className="mt-1 text-sm text-red-500">{errors.coverUrl}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition-all resize-none`}
                            placeholder="Write a brief description of the book..."
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            Add Book to Collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
