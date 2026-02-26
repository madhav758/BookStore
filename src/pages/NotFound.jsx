import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';

const NotFound = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-zinc-900 p-12 rounded-2xl shadow-xl text-center max-w-lg w-full border border-zinc-800">
                <div className="bg-red-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="w-12 h-12 text-red-500" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Page Not Found</h1>
                <p className="text-zinc-400 mb-2">The page you are looking for does not exist.</p>
                <div className="bg-zinc-800 p-3 rounded-lg font-mono text-sm text-zinc-300 mb-8 break-all border border-zinc-700">
                    {location.pathname}
                </div>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-zinc-100 text-zinc-900 font-bold rounded-xl hover:bg-white transition-colors w-full"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
