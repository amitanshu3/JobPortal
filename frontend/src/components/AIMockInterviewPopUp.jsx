import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { XCircle } from 'lucide-react';

const AIMockInterviewPopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Display the pop-up when the component is mounted
    setShowPopUp(true);
  }, []);

  const handleClose = () => {
    setShowPopUp(false);
  };

  const handleStartInterview = () => {
    navigate('/mock-interview');
  };

  return (
    showPopUp && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">AI Mock Interview</h2>
          <p className="mb-4">
            Get ready for your next job interview with our AI-powered mock interview tool. Sharpen your skills and boost your confidence!
          </p>
          <button
            onClick={handleStartInterview}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Start Mock Interview
          </button>
        </div>
      </div>
    )
  );
};

export default AIMockInterviewPopUp;
