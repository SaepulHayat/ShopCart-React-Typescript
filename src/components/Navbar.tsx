import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import { useCart } from '../contexts/CartContexts';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { SiShopify } from 'react-icons/si';

const Navbar: React.FC = () => {
    const { logout, isAuthenticated } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <SiShopify className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">ShopSmart</span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/products"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/cart"
                                    className="text-gray-600 hover:text-blue-600 transition-colors relative"
                                >
                                    <FiShoppingCart className="h-6 w-6" />
                                    {items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {items.length}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    <FiLogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <FiUser className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContexts';
// import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

// const Navbar = () => {
//     const { isAuthenticated, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     };

//     return (
//         <nav className="bg-white shadow-md fixed w-full z-10">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16">
//                     {/* Logo */}
//                     <div className="flex items-center">
//                         <Link to="/" className="text-xl font-bold text-blue-600">
//                             ShopSmart
//                         </Link>
//                     </div>

//                     {/* Navigation Links */}
//                     <div className="flex items-center space-x-4">
//                         <Link
//                             to="/products"
//                             className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
//                         >
//                             Products
//                         </Link>

//                         {isAuthenticated ? (
//                             <>
//                                 <Link
//                                     to="/cart"
//                                     className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
//                                 >
//                                     <FiShoppingCart className="h-5 w-5" />
//                                 </Link>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
//                                 >
//                                     <FiLogOut className="h-5 w-5" />
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link
//                                     to="/login"
//                                     className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
//                                 >
//                                     <FiUser className="h-5 w-5 mr-1" />
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                                 >
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;