import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import authService from '../services/auth';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiLoader } from 'react-icons/fi';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Semua field harus diisi');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Password tidak cocok');
            return false;
        }

        if (formData.password.length < 6) {
            toast.error('Password minimal 6 karakter');
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
            const response = await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            login(response.user);
            toast.success('Registrasi berhasil!');
            navigate('/', { replace: true });
        } catch (error: any) {
            console.error('Register error:', error);
            toast.error(error.message || 'Registrasi gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Atau{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            masuk ke akun yang sudah ada
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="name" className="sr-only">Nama Lengkap</label>
                            <FiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full pl-12 pr-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-800"
                                placeholder="Nama lengkap"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full pl-12 pr-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-800"
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
                                className="block w-full pl-12 pr-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-800"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">Konfirmasi Password</label>
                            <FiLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="block w-full pl-12 pr-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-800"
                                placeholder="Konfirmasi password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400"
                    >
                        {loading ? (
                            <FiLoader className="animate-spin mx-auto h-5 w-5" />
                        ) : (
                            'Daftar'
                        )}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Register;

