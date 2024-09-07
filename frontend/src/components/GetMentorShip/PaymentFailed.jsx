import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {/* Updated cross icon */}
        <svg className="w-16 h-16 mx-auto text-red-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mt-4">Payment Failed!</h1>
        <p className="mt-2 text-gray-600">We’re sorry, but there was an issue with processing your payment. Please try again.</p>
        <div className="mt-6 space-y-2">
          <Link to="/mentors" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
            Retry Payment
          </Link>
          <p className="text-gray-600 m-5">or</p>
          <Link to="/" className="bg-gray-500 text-white px-4 py-2  rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
