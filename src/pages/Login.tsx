import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import authService from '../services/auth';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi';

interface LocationState {
    message?: string;
    email?: string;
}

const Login: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const state = location.state as LocationState;
        if (state?.message) {
            toast.success(state.message);
            if (state.email) {
                setFormData(prev => ({ ...prev, email: state.email || '' }));
            }
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            toast.error('Email dan password harus diisi');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Format email tidak valid');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await authService.login({
                email: formData.email,
                password: formData.password
            });

            login(response.user);
            toast.success('Login berhasil!');
            navigate('/', { replace: true });
        } catch (error: any) {
            toast.error(error.message || 'Login gagal');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Login ke Akun Anda</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Atau{' '}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            daftar akun baru
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full pl-12 pr-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                placeholder="Alamat email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <FiLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full pl-12 pr-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Lupa password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                    >
                        {loading ? (
                            <FiLoader className="animate-spin mx-auto h-5 w-5" />
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;

// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContexts';
// import { toast } from 'react-toastify';
// import { FiMail, FiLock } from 'react-icons/fi';

// const Login = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             // Untuk sementara kita pakai data dummy
//             const dummyUser = {
//                 id: 1,
//                 email: formData.email,
//                 name: 'John Doe',
//                 role: 'customer',
//                 avatar: 'https://api.lorem.space/image/face?w=150&h=150'
//             };

//             // Simulasi delay network
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             login(dummyUser);
//             toast.success('Login successful!');
//             navigate('/products');
//         } catch (error) {
//             toast.error('Login failed. Please check your credentials.');
//             console.error('Login error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         Sign in to your account
//                     </h2>
//                     <p className="mt-2 text-center text-sm text-gray-600">
//                         Or{' '}
//                         <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
//                             create a new account
//                         </Link>
//                     </p>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     <div className="rounded-md shadow-sm space-y-4">
//                         <div>
//                             <label htmlFor="email" className="sr-only">
//                                 Email address
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <FiMail className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     required
//                                     className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                     placeholder="Email address"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="sr-only">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <FiLock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     required
//                                     className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                     placeholder="Password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
//                         >
//                             {loading ? 'Signing in...' : 'Sign in'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
