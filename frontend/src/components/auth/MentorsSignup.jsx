import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MENTOR_API_END_POINT } from '@/utils/constant'; 
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const MentorSignup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        currentRole: "",
        
        expertise: "",
        experienceYears: "",
        availability: "",
        hourlyRate: "",
        targetDomain: "", 
        additionalInfo: "", 
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("currentRole", input.currentRole); 
        
        formData.append("expertise", input.expertise);
        formData.append("experienceYears", input.experienceYears);
        formData.append("availability", input.availability);
        formData.append("hourlyRate", input.hourlyRate);
        formData.append("targetDomain", input.targetDomain); 
        formData.append("additionalInfo", input.additionalInfo); 
        if (input.file) {
            formData.append("profilePhoto", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${MENTOR_API_END_POINT}/signup`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            console.log(res.data+" i am resdata")
            if (res.data.success) {
                navigate("/mentorslogin");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/mentors");
        }
    }, [user, navigate]);

    return (
        <div     style={{
            background: 'linear-gradient(to bottom right, #e2e8f0, #cbd5e1)',
            
        }}>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto' >
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200  p-4 my-10 bg-white shadow-lg rounded-lg'>
                    <h1 className='font-bold text-xl mb-5'>Mentor Sign Up</h1>
                    
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john.doe@example.com"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                        />
                    </div>
                    


                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Current Role</Label>
                        <Input
                            type="text"
                            value={input.currentRole}
                            name="currentRole"
                            onChange={changeEventHandler}
                            placeholder="e.g., Software Engineer L4"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Expertise</Label>
                        <Input
                            type="text"
                            value={input.expertise}
                            name="expertise"
                            onChange={changeEventHandler}
                            placeholder="e.g., JavaScript, React"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Experience Years</Label>
                        <Input
                            type="number"
                            value={input.experienceYears}
                            name="experienceYears"
                            onChange={changeEventHandler}
                            placeholder="5"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Availability</Label>
                        <Input
                            type="text"
                            value={input.availability}
                            name="availability"
                            onChange={changeEventHandler}
                            placeholder="Weekdays 2-4 PM"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Hourly Rate (INR)</Label>
                        <Input
                            type="number"
                            value={input.hourlyRate}
                            name="hourlyRate"
                            onChange={changeEventHandler}
                            placeholder="12500"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Target Domain</Label>
                        <Input
                            type="text"
                            value={input.targetDomain}
                            name="targetDomain"
                            onChange={changeEventHandler}
                            placeholder="e.g., Fullstack Developer"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Additional Information</Label>
                        <Input
                            type="text"
                            value={input.additionalInfo}
                            name="additionalInfo"
                            onChange={changeEventHandler}
                            placeholder="I’ll be there throughout your placement journey."
                        />
                    </div>
                    
                    <div className='flex items-center gap-2'>
                        <Label>Profile Photo</Label>
                        <Input
                            accept="image/*"
                            type="file"   name="profilePhoto"
                            onChange={changeFileHandler}
                            className="cursor-pointer"      
                        />
                    </div>

                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Sign Up</Button>
                    }

                    <span className='text-sm'>Already have an account? <Link to="/mentorslogin" className='text-blue-600'>Login</Link></span>

                    <div className="mt-6">
                        <span className="text-sm">Want to login as a </span>
                        <Link to="/login" className='text-blue-600 mx-2'>Student</Link>
                        <span>or</span>
                        <Link to="/login" className='text-blue-600 mx-2'>Recruiter</Link>
                        <span>?</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MentorSignup;
