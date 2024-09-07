import { setMentor } from '@/redux/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Make sure to import the action

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Destructure mentor details from the props
  const {
    fullname,
    currentRole,
    expertise,
    additionalInfo,
    targetDomain,
    hourlyRate,
    profilePhoto,
    availability,
    experienceYears
  } = mentor;

  const handleButtonClick = () => {
    dispatch(setMentor(mentor)); 
    navigate('/studentform'); 
  };

  return (
    <div
      className="mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      style={{ width: "70%" }}
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            className="h-full w-full object-cover"
            src={profilePhoto || "https://via.placeholder.com/150"}
            alt={`${fullname}'s profile`}
          />
        </div>
        <div className="md:w-2/3 flex flex-col justify-between p-8">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Star Mentor
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {fullname}
            </h1>
            <p className="mt-2 text-gray-500">{currentRole}</p>
          </div>
          <div>
            <div className="mt-2 text-gray-500 flex flex-wrap gap-2">
              {expertise.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-2 text-gray-500">{additionalInfo}</p>
            <div className="mt-4">
              <span className="text-gray-500">For:</span>{" "}
              <span className="font-semibold">
                Working Professional / Fresher
              </span>
            </div>
            <div className="mt-4">
              <span className="text-gray-500">Targeting Domains:</span>{" "}
              <span className="font-semibold">{targetDomain}</span>
            </div>

            <div className="mt-4">
              <span className="text-gray-500">Experience Year:</span>{" "}
              <span className="font-semibold">{experienceYears}</span>
            </div>



            <div className="mt-4 flex items-center">
              <span className="font-semibold text-xl text-gray-900">
                ₹{hourlyRate.toLocaleString()}
              </span>
              <span className="ml-2 text-gray-500">Per Month</span>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                onClick={handleButtonClick}
              >
                Get 1:1
              </button>
            </div>
            <p className="mt-2 text-gray-500">Next Available: {availability}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
