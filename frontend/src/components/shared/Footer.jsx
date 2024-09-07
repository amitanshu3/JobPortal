import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h2>
                        <p className="mt-2 text-gray-400">Connecting talent with opportunity.</p>
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
                        <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                        <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </div>
                </div>
                <div className="mt-4 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400">&copy; 2024 JobPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
