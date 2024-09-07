import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MentorCard from './MentorCard';
import { toast } from 'sonner';
import { MENTOR_API_END_POINT } from '@/utils/constant';
import Navbar from '../shared/Navbar';

const MentorsList = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${MENTOR_API_END_POINT}/getallmentors`);
        if (response.data.success) {
          setMentors(response.data.data);
          setFilteredMentors(response.data.data);
        } else {
          toast.error('Failed to fetch mentors');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    let filtered = mentors;

    if (selectedExpertise) {
      filtered = filtered.filter((mentor) =>
        mentor.expertise.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()))
      );
    }

    if (selectedExperience) {
      filtered = filtered.filter(mentor => {
        const years = mentor.experienceYears;
        if (selectedExperience === '1-3') return years >= 1 && years <= 3;
        if (selectedExperience === '4-6') return years >= 4 && years <= 6;
        if (selectedExperience === '7+') return years >= 7;
        return true;
      });
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((mentor) =>
        mentor.fullname.toLowerCase().includes(lowerCaseSearchTerm) ||
        mentor.expertise.some(exp => exp.toLowerCase().trim().includes(lowerCaseSearchTerm))
      );
    }

    setFilteredMentors(filtered);
  }, [searchTerm, selectedExpertise, selectedExperience, mentors]);

  const handleExpertiseChange = (event) => {
    setSelectedExpertise(event.target.value.trim());
  };

  const handleExperienceChange = (event) => {
    setSelectedExperience(event.target.value);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='h-6 w-6 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin'></div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className=' flex  gap-6'>
        {/* Left Sidebar for Expertise and Experience Filter */}
        <div className='w-1/4 bg-gray-100 p-4 rounded sticky top-0 h-[calc(100vh-4rem)]'>
          <h2 className='text-lg font-semibold mb-4'>Filter by Expertise</h2>
          <div className='flex flex-col gap-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='expertise'
                value=''
                checked={selectedExpertise === ''}
                onChange={handleExpertiseChange}
                className='mr-2'
              />
              All
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='expertise'
                value='Java'
                checked={selectedExpertise === 'Java'}
                onChange={handleExpertiseChange}
                className='mr-2'
              />
              Java
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='expertise'
                value='MERN stack'
                checked={selectedExpertise === 'MERN stack'}
                onChange={handleExpertiseChange}
                className='mr-2'
              />
              MERN Stack
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='expertise'
                value='Data Science'
                checked={selectedExpertise === 'Data Science'}
                onChange={handleExpertiseChange}
                className='mr-2'
              />
              Data Science
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='expertise'
                value='Python'
                checked={selectedExpertise === 'Python'}
                onChange={handleExpertiseChange}
                className='mr-2'
              />
              Python
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='expertise'
                value='C++'
                checked={selectedExpertise === 'C++'}
                onChange={handleExpertiseChange}
                className='mr-2'
              />
              C++
            </label>
          </div>

          <h2 className='text-lg font-semibold mb-4 mt-8'>Filter by Experience</h2>
          <div className='flex flex-col gap-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='experience'
                value=''
                checked={selectedExperience === ''}
                onChange={handleExperienceChange}
                className='mr-2'
              />
              All
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='experience'
                value='1-3'
                checked={selectedExperience === '1-3'}
                onChange={handleExperienceChange}
                className='mr-2'
              />
              1-3 Years
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='experience'
                value='4-6'
                checked={selectedExperience === '4-6'}
                onChange={handleExperienceChange}
                className='mr-2'
              />
              4-6 Years
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='experience'
                value='7+'
                checked={selectedExperience === '7+'}
                onChange={handleExperienceChange}
                className='mr-2'
              />
              7+ Years
            </label>
          </div>
        </div>

        {/* Main Content for Mentor Cards */}
        <div className='w-3/4 flex flex-col gap-6 '>
          <div className='text-center mb-6'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Meet Our Expert Mentors
            </h1>
            <p className='mt-2 text-gray-600'>
              Explore our curated list of mentors who are ready to guide you in your professional journey. Use the search bar to find mentors based on skills, domain expertise, or names.
            </p>
          </div>
          <div className="flex justify-center">
            <input
              className='h-12 w-full max-w-md bg-slate-100 rounded-full px-4 py-2 placeholder-gray-500'
              type="text"
              placeholder='Search For Any Skill, Domain or Name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="cards flex flex-col gap-4">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <MentorCard key={mentor._id} mentor={mentor} />
              ))
            ) : (
              <p className='text-center text-gray-600'>No mentors found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorsList;
