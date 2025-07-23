import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 CapeControl. All rights reserved.</p>
        <div className="mt-2">
          <a href="/docs/Customer_Terms_and_Conditions.md" className="text-blue-400 hover:underline mr-4">
            Terms and Conditions
          </a>
          <a href="/docs/Developer_Terms_and_Conditions.md" className="text-blue-400 hover:underline">
            Developer Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
