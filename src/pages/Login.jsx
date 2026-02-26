import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../redux/authSlice';
import { BookOpen } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-950 px-4">
            <div className="max-w-md w-full space-y-8 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BookOpen className="h-12 w-12 text-zinc-100" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Welcome back to BookStore
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-950 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent sm:text-sm transition-colors"
                                placeholder="Enter your username"
                                value={username}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-950 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent sm:text-sm transition-colors"
                                placeholder="Enter your password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-zinc-900 bg-zinc-100 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="text-center text-sm text-zinc-400">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-white hover:underline transition-colors">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
