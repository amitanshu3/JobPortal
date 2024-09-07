import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;

        // Check if the user is a mentor
        const isMentor = user && user.currentRole;
        const isStudent = user && user.role === 'student';
        const isRecruiter = user && user.role === 'recruiter';

        // Define allowed routes for mentors
        const mentorAllowedRoutes = ['/mentorssignup', '/mentorslogin', '/mentorprofile'];

        if (isMentor) {
            // Redirect to mentor profile if trying to access unauthorized routes
            if (!mentorAllowedRoutes.includes(currentPath)) {
                navigate('/mentorprofile');
            }
        } else if (!user) {
            // User is not logged in
            if (currentPath === '/carrerbot' || currentPath === '/mentors') {
                toast.info('Please log in to access this page.');
                navigate('/login'); // Redirect to login page
            }
        } else if (isRecruiter && currentPath === '/carrerbot') {
            // Recruiter should access the admin companies page
            navigate('/admin/companies');
        } else if (currentPath === '/mentors' && !isStudent) {
            // Redirect non-students away from the /mentors page
            toast.info('Access denied. Students only.');
            navigate('/');
        } else if (!isRecruiter && !isMentor && !isStudent) {
            // Redirect if the user role does not match any known role
            toast.info('Access denied.');
            navigate('/');
        }
    }, [user, location.pathname, navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
