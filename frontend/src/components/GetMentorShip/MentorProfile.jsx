import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { MENTOR_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { setLoading } from '@/redux/authSlice';
import MentorNavbar from './MentorNavbar';

const MentorProfile = () => {
    const [mentorData, setMentorData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        currentRole: '',
        expertise: '',
        additionalInfo: '',
    });
    const [profilePhoto, setProfilePhoto] = useState(null); // New state for profile photo
    const { user, loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMentorData = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${MENTOR_API_END_POINT}/get/${user._id}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setMentorData(res.data.mentor);
                    setFormData({
                        fullname: res.data.mentor.fullname,
                        email: res.data.mentor.email,
                        currentRole: res.data.mentor.currentRole,
                        expertise: res.data.mentor.expertise,
                        additionalInfo: res.data.mentor.additionalInfo,
                    });
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch mentor profile data');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchMentorData();
    }, [user, dispatch]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const updateFormData = new FormData();
            updateFormData.append('fullname', formData.fullname);
            updateFormData.append('email', formData.email);
            updateFormData.append('currentRole', formData.currentRole);
            updateFormData.append('expertise', formData.expertise);
            updateFormData.append('additionalInfo', formData.additionalInfo);
            if (profilePhoto) {
                updateFormData.append('profilePhoto', profilePhoto);
            }

            const res = await axios.post(`${MENTOR_API_END_POINT}/update/${user._id}`, updateFormData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                setMentorData(res.data.mentor);
                toast.success('Profile updated successfully');
                setIsEditing(false);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update mentor profile');
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (loading || !mentorData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className='mr-2 h-6 w-6 animate-spin' />
                Loading...
            </div>
        );
    }

    return (
        <div>
            <MentorNavbar />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
                {/* Background Header */}
                <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                    <div className="flex justify-center ">
                        <img
                            className="w-32 h-32 object-cover rounded-full border-4 mt-5 border-white"
                            src={mentorData.profilePhoto || "https://via.placeholder.com/150"} // Replace with mentor's profile photo URL
                            alt="Mentor"
                        />
                    </div>
                    <button
                        className="absolute top-4 right-4 bg-yellow-400 text-yellow-800 text-sm font-semibold py-1 px-3 rounded-full"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Profile Details */}
                <div className="text-center px-8 pb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mt-6">{mentorData.fullname}</h2>
                    <h4 className="text-2xl font-bold text-gray-900 mt-6">{mentorData.email}</h4>
                    <p className="text-gray-600 mt-2">{mentorData.currentRole}</p>

                    <div className="mt-4 flex justify-center space-x-3">
                        <span className="bg-yellow-400 text-yellow-800 text-sm font-semibold py-1 px-3 rounded-full">
                            ⭐ Star Mentor
                        </span>
                        <span className="bg-yellow-400 text-yellow-800 text-sm font-semibold py-1 px-3 rounded-full">
                            {mentorData.expertise} Expertise
                        </span>
                    </div>

                    <p className="text-gray-600 mt-6">
                        {mentorData.additionalInfo}
                    </p>

                    <div className="mt-4 flex justify-center space-x-8 text-gray-600">
                        <div>
                            <span className="font-semibold text-xl text-gray-900">{mentorData.ratings.average || 'N/A'}</span>
                            <p>{mentorData.ratings.reviews.length} Reviews</p>
                        </div>
                        <div>
                            <span className="font-semibold text-xl text-gray-900">{mentorData.experienceYears}+</span>
                            <p>Mentoring Mins</p>
                        </div>
                        <div>
                            <span className="font-semibold text-xl text-gray-900">{mentorData.mentees.length || 'N/A'}</span>
                            <p>Mentees</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center space-x-6 text-gray-600">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-800 font-semibold">{mentorData.experienceYears} years of experience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="https://via.placeholder.com/24" alt="Company Logo" className="w-6 h-6" />
                            <span>{mentorData.currentRole}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="https://via.placeholder.com/24" alt="Company Logo" className="w-6 h-6" />
                            <span>{mentorData.targetDomain}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Current Role</label>
                                <input
                                    type="text"
                                    name="currentRole"
                                    value={formData.currentRole}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Expertise</label>
                                <input
                                    type="text"
                                    name="expertise"
                                    value={formData.expertise}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Additional Info</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Profile Photo</label>
                                <input
                                    type="file"
                                    name="profilePhoto"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorProfile;
