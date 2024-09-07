import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {  setUser } from '@/redux/authSlice'; // Adjust the path as necessary

const MentorNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const handleLogout = () => {
        // You might want to add actual logout logic here
        dispatch(setUser(null));
        toast.success('Logged out successfully');
        navigate('/mentorslogin'); // Adjust the path if necessary
    };

    const handleAnotherAction = () => {
        // Placeholder for another button action
        toast.info('Another action triggered');
    };

    return (
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">JobPortal</span>
                <span className="text-md">{user.fullname}</span>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleAnotherAction}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Additional Action
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default MentorNavbar;
