import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { PAYMENT_URL } from '@/utils/constant';

const StudentForm = () => {

 const {mentor}=useSelector(store=>store.auth);

    const [formData, setformdata] = useState({
        name: '',
        city: '',
        email: '',
        phone: '',
        college: '',
        domain: '',
        lectureTime: '',
        skills: ''
    });

    const handleChange = (e) => {
        setformdata({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdatastring = JSON.stringify(formData);
        console.log(formdatastring);

        console.log("handle submit");
        localStorage.setItem("formdata", formdatastring);

        getfuction();
    };

    const getfuction = async () => {
        const stripe = await loadStripe('pk_test_51Pvhb0RtJv2yLLOZ0bI24G26rC1XRg5uhXLemcHnRVEu3yGjwdBNXGS9g7kVxlY5namkIoNdw3FVG7HmUYkK5pnY00X83bgrrR');

        console.log("stripe function");

        const body = {
            product: mentor.hourlyRate
        };
        console.log(body);

        const headers = {
            "Content-Type": "application/json"
        };
        const response = await fetch(PAYMENT_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-3/5 lg:w-2/5">
                <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Mentorship Application</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Fill out the form below to register for a personalized 1:1 mentorship session. Please provide accurate details to help us match you with the best mentor.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                                City
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your city"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* College */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="college">
                                College
                            </label>
                            <input
                                id="college"
                                name="college"
                                type="text"
                                value={formData.college}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your college name"
                                required
                            />
                        </div>

                        {/* Domain */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="domain">
                                Domain
                            </label>
                            <input
                                id="domain"
                                name="domain"
                                type="text"
                                value={formData.domain}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your preferred domain"
                                required
                            />
                        </div>

                        {/* Lecture Time */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="lectureTime">
                                Lecture Time
                            </label>
                            <input
                                id="lectureTime"
                                name="lectureTime"
                                type="text"
                                value={formData.lectureTime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter the time you are available for lectures"
                                required
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="skills">
                                Skills
                            </label>
                            <input
                                id="skills"
                                name="skills"
                                type="text"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="Enter your skills (comma separated)"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
