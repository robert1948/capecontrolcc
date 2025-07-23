import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Upgrade to Premium</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Premium Features:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Unlimited AI queries</li>
              <li>Priority support</li>
              <li>Advanced AI models</li>
              <li>Custom integrations</li>
            </ul>
          </div>
          <div className="text-center mb-6">
            <span className="text-3xl font-bold">$29.99</span>
            <span className="text-gray-600">/month</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
