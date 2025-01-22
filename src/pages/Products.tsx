import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContexts';
import { FiShoppingCart, FiLoader, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { getProducts } from '../services/products';
import { Product } from '../types/api.types';


const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({
    product,
    onAddToCart
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
        <div className="relative group h-48">
            <img
                src={product.images[0] || "https://via.placeholder.com/300x300.png?text=Product+Image"}
                alt={product.title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/300x300.png?text=Product+Image";
                }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
        <div className="p-4">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                {product.category.name}
            </p>
            <h3 className="mt-1 text-sm font-medium text-gray-900 line-clamp-1">
                {product.title}
            </h3>
            <p className="mt-1 text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {product.description}
            </p>
            <button
                onClick={() => onAddToCart(product)}
                className="mt-4 w-full bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
                <FiShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
            </button>
        </div>
    </motion.div>
);

const Products: React.FC = () => {
    const { addItem } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                // Filter out products with invalid images
                const validProducts = data.filter((product: Product) =>
                    product.images &&
                    product.images.length > 0 &&
                    !product.images[0].includes('undefined')
                );
                setProducts(validProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addItem({
            id: product.id,
            name: product.title,
            price: product.price,
            quantity: 1
        });
        // toast.success('Added to cart!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <FiLoader className="h-8 w-8 text-blue-600 animate-spin" />
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10">
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-8"
                >
                    Our Products
                </motion.h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Products;
