import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import BotApp from './components/CarrerBot/components/BotApp';
import MentorsList from './components/GetMentorShip/MentorsList';
import MentorSignup from './components/auth/MentorsSignup';
import MentorLogin from './components/auth/MentorLogin';
import MentorProfile from './components/GetMentorShip/MentorProfile';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import StudentForm from './components/GetMentorShip/StudentForm';
import Success from './components/GetMentorShip/Success';
import PaymentFailedPage from './components/GetMentorShip/PaymentFailed';
import './App.css'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/carrerbot',
    element: <ProtectedRoute><BotApp /></ProtectedRoute>
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: '/mentorssignup',
    element: <MentorSignup />
  },
  {
    path: '/mentorslogin',
    element: <MentorLogin />
  },
  {
    path: '/mentorprofile',
    element: <MentorProfile />
  },
  {
    path: "/mentors",
    element: <ProtectedRoute><MentorsList /></ProtectedRoute>
  },
 
 {
   path:'/studentform',
   element:<StudentForm />
 },
 {
  path:'/success',
  element:<Success />
 },
 {
  path:'/failed',
 element:<PaymentFailedPage />
 },
  // admin routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;
