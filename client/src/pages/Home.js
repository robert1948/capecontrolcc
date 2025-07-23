import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to CapeControl</h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-driven solutions with a freemium model
          </p>
          <div className="space-x-4">
            <a
              href="/signup"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 inline-block"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 inline-block"
            >
              Login
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
