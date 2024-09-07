import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Success() {

    const { mentor } = useSelector(store => store.auth);
   const {user}=useSelector(store=>store.auth);

    useEffect(() => {
        let studentData = JSON.parse(localStorage.getItem("formdata"));
        
        // Assuming mentor data format as provided
        const mentorData = {
            _id: mentor._id,
            fullname: mentor.fullname,
            email: mentor.email,
            phoneNumber: mentor.phoneNumber,
            currentRole: mentor.currentRole
        };
        const studentId={
            _id:user._id
        }

        // Combine student and mentor data into one object
        const dataToSend = {
            student: studentData,
            mentor: mentorData,
            studentId:studentId
        };

        fetch('http://localhost:8000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Emails sent successfully:', data);
        })
        .catch((error) => {
            console.error('Error sending emails:', error);
        });
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                <svg className="w-16 h-16 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h1 className="text-3xl font-bold text-green-600 mt-4">Payment Successful!</h1>
                <p className="mt-2 text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
                <p className="mt-2 text-gray-600">Check your mail for further details.</p>
                <div className="mt-6">
                    <Link to="/" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
