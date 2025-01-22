import React from 'react';
import { useCart } from '../contexts/CartContexts';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

    const handleDecreaseQuantity = (itemId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            updateQuantity(itemId, currentQuantity - 1);
        } else {
            removeItem(itemId);
        }
    };

    const handleIncreaseQuantity = (itemId: number, currentQuantity: number) => {
        updateQuantity(itemId, currentQuantity + 1);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products" className="text-blue-500 hover:text-blue-600">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded">
                                    <button
                                        onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                        className="px-3 py-1 border-r hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-3">{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                        className="px-3 py-1 border-l hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-gray-600 min-w-[80px] text-right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-lg font-semibold">
                            Total: ${getTotalPrice().toFixed(2)}
                        </div>
                        <Link
                            to="/checkout"
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;