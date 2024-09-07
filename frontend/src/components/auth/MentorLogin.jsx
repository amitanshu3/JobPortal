import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MENTOR_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';

const MentorLogin = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${MENTOR_API_END_POINT}/login`, input);
            if (res.data.success) {
                dispatch(setUser(res.data.mentor));
                navigate("/mentorprofile");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div 
                className="flex-1 flex items-center justify-center"
                style={{
                    background: 'linear-gradient(to bottom right, #e2e8f0, #cbd5e1)',
                    padding: '20px',
                }}
            >
                <form 
                    onSubmit={submitHandler} 
                    className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
                    style={{ backdropFilter: 'blur(10px)' }}
                >
                    <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">Mentor Login</h1>
                    
                    <div className="my-4">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john.doe@example.com"
                            className="border-gray-300"
                        />
                    </div>
                    
                    <div className="my-4">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="**********"
                            className="border-gray-300"
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4  text-white">Login</Button>
                    )}

                    <span className="block text-center text-sm mt-4">Don't have an account? 
                        <Link to="/mentorssignup" className="text-blue-600 ml-2">Sign Up</Link>
                    </span>

                    <div className="mt-6 text-center">
                        <span className="text-sm">Want to login as a </span>
                        <Link to="/login" className="text-blue-600 mx-2">Student</Link>
                        <span>or</span>
                        <Link to="/login" className="text-blue-600 mx-2">Recruiter</Link>
                        <span>?</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MentorLogin;
