import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import { FiShoppingBag, FiTruck, FiCreditCard, FiHeart } from 'react-icons/fi';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: <FiShoppingBag className="h-8 w-8" />,
            title: 'Premium Selection',
            description: 'Curated collection of high-quality products'
        },
        {
            icon: <FiTruck className="h-8 w-8" />,
            title: 'Express Delivery',
            description: 'Fast and reliable shipping worldwide'
        },
        {
            icon: <FiCreditCard className="h-8 w-8" />,
            title: 'Secure Payments',
            description: 'Multiple safe payment options'
        },
        {
            icon: <FiHeart className="h-8 w-8" />,
            title: 'Customer Love',
            description: '24/7 dedicated support team'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-[90vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Welcome to ShopSmart
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200">
                            Your one-stop shop for all your needs
                        </p>
                        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200">
                            By Saepul Hayat
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <button
                                onClick={() => navigate(isAuthenticated ? '/products' : '/login')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-yellow-400 hover:text-white transition-all"
                            >
                                {isAuthenticated ? 'Start Shopping' : 'Login to Shop'}
                            </button>
                            {!isAuthenticated && (
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all"
                                >
                                    Create Account
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                            >
                                <div className="text-blue-600 mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home: React.FC = () => {
//     console.log('Home component rendering'); // Tambahkan ini untuk debugging

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="text-center">
//                 <h1 className="text-4xl font-bold text-blue-600">
//                     Welcome to ShopSmart
//                 </h1>
//                 <div className="mt-4">
//                     <Link
//                         to="/login"
//                         className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
//                     >
//                         Login
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;