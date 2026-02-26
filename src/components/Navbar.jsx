import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, PlusCircle, LogOut, User } from 'lucide-react';
import { logout, reset } from '../redux/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="bg-zinc-900 border-b border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-zinc-100">
                        <BookOpen className="w-6 h-6" />
                        <span>BookStore</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-zinc-400 hover:text-zinc-100 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/books" className="text-zinc-400 hover:text-zinc-100 font-medium transition-colors">
                            Browse Books
                        </Link>
                        {user ? (
                            <>
                                <Link to="/add-book" className="flex items-center space-x-1 text-zinc-400 hover:text-zinc-100 font-medium transition-colors">
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Add Book</span>
                                </Link>
                                <button className="flex items-center space-x-1 text-zinc-400 hover:text-red-400 font-medium transition-colors" onClick={onLogout}>
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout ({user.username})</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center space-x-1 text-zinc-400 hover:text-zinc-100 font-medium transition-colors">
                                    <User className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                                <Link to="/register" className="flex items-center space-x-1 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-white font-medium transition-colors shadow-sm">
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
