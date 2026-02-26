import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../redux/booksSlice';
import { PlusCircle, Upload } from 'lucide-react';

const AddBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        coverUrl: '',
        pdfFile: null
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
        if (!formData.pdfFile) newErrors.pdfFile = "PDF strictly required for the book content";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('author', formData.author);
            submitData.append('category', formData.category);
            submitData.append('description', formData.description);
            submitData.append('coverUrl', formData.coverUrl);
            if (formData.pdfFile) {
                submitData.append('pdfFile', formData.pdfFile);
            }
            dispatch(addBook(submitData));
            navigate('/books');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, pdfFile: file }));
            if (errors.pdfFile) {
                setErrors(prev => ({ ...prev, pdfFile: null }));
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData(prev => ({ ...prev, pdfFile: file }));
            if (errors.pdfFile) {
                setErrors(prev => ({ ...prev, pdfFile: null }));
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const openFilePicker = () => {
        fileInputRef.current.click();
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
            <div className="max-w-2xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-800 px-8 py-6 border-b border-zinc-700">
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <PlusCircle className="mr-2" />
                        Add New Book
                    </h1>
                    <p className="text-zinc-400">Enter the details of the new book to add to the library.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Book Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border bg-zinc-900 text-white placeholder-zinc-500 ${errors.title ? 'border-red-500 ring-1 ring-red-500' : 'border-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent'} outline-none transition-all`}
                            placeholder="e.g. The Great Gatsby"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border bg-zinc-900 text-white placeholder-zinc-500 ${errors.author ? 'border-red-500 ring-1 ring-red-500' : 'border-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent'} outline-none transition-all`}
                                placeholder="e.g. F. Scott Fitzgerald"
                            />
                            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border bg-zinc-900 text-white ${errors.category ? 'border-red-500 ring-1 ring-red-500' : 'border-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent'} outline-none transition-all`}
                            >
                                <option value="" className="text-zinc-500">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Cover Image URL</label>
                        <input
                            type="url"
                            name="coverUrl"
                            value={formData.coverUrl}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border bg-zinc-900 text-white placeholder-zinc-500 ${errors.coverUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent'} outline-none transition-all`}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.coverUrl && <p className="mt-1 text-sm text-red-500">{errors.coverUrl}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full px-4 py-3 rounded-xl border bg-zinc-900 text-white placeholder-zinc-500 ${errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent'} outline-none transition-all resize-none`}
                            placeholder="Write a brief description of the book..."
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Book PDF File</label>
                        {/* Hidden real file input – triggered programmatically to avoid browser blocking */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="pdfFile"
                            accept=".pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        {/* Drop zone + choose button */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`w-full rounded-xl border-2 border-dashed ${isDragging
                                ? 'border-zinc-500 bg-zinc-800'
                                : errors.pdfFile
                                    ? 'border-red-500 bg-red-500/10'
                                    : 'border-zinc-700 bg-zinc-900/50'
                                } transition-all p-6 text-center hover:bg-zinc-800/50`}
                        >
                            <Upload className="mx-auto mb-2 text-zinc-500" size={28} />
                            {formData.pdfFile ? (
                                <p className="text-sm text-emerald-500 font-medium">✅ {formData.pdfFile.name}</p>
                            ) : (
                                <p className="text-sm text-zinc-500">Drag & drop a PDF here, or</p>
                            )}
                            <button
                                type="button"
                                onClick={openFilePicker}
                                className="mt-2 px-4 py-2 bg-zinc-100 text-zinc-900 text-sm font-semibold rounded-lg hover:bg-white transition-colors"
                            >
                                Choose File
                            </button>
                        </div>
                        {errors.pdfFile && <p className="mt-1 text-sm text-red-500">{errors.pdfFile}</p>}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-zinc-100 text-zinc-900 font-bold py-4 rounded-xl hover:bg-white transition-colors"
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
