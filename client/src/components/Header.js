import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CapeControl</h1>
        <nav>
          <a href="/" className="mr-4 hover:underline">Home</a>
          <a href="/login" className="mr-4 hover:underline">Login</a>
          <a href="/signup" className="hover:underline">Sign Up</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
