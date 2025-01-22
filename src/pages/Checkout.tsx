import React from 'react';
import { useCart } from '../contexts/CartContexts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { items, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const totalPrice = getTotalPrice();

    const handlePayment = () => {
        // Menampilkan notifikasi sukses pembayaran
        toast.success('Payment successful! Thank you for your purchase!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
        });

        // Tunggu sebentar sebelum clear cart dan redirect
        setTimeout(() => {
            clearCart(); // Kosongkan cart setelah pembayaran
            navigate('/products'); // Redirect ke halaman products
        }, 3000);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            {items.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between py-3 border-b last:border-none">
                                <div className="flex-1">
                                    <span className="text-gray-800">{item.name}</span>
                                    <span className="text-gray-500 text-sm ml-2">
                                        (${item.price.toFixed(2)} x {item.quantity})
                                    </span>
                                </div>
                                <span className="text-gray-800 font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-gray-800">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-gray-800">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                        onClick={handlePayment}
                        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                        Pay Now (${totalPrice.toFixed(2)})
                    </button>
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default Checkout;