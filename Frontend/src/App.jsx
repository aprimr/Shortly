import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./static/LandingPage";
import NotFound from "./static/NotFound";

import UserLogin from "./pages/auth/UserLogin";
import UserSignup from "./pages/auth/UserSignup";
import AdminLogin from "./pages/auth/AdminLogin";

import Home from './pages/Home'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SecondaryFooter from "./components/SecondaryFooter";

import Test from './pages/Test'
import VerifyAccount from "./pages/security/VerifyAccount";
import ForgotPassword from "./pages/security/ForgotPassword";


const AppLayout = () => {

  const user = useSelector((state)=>state.auth.user)

  const location = useLocation();
  const hideNavbar = ["/login", "/signup", "/admin/login", "/verify-account", "/forgot-password"].includes(location.pathname);
  const hideFooter = ["/login", "/signup", "/admin/login", "/verify-account", "/forgot-password"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={!user? <LandingPage /> : <Navigate to='/home' />} />

        <Route path="/home" element={user?<Home /> : <Navigate to='/' />} />
        <Route path="/analytics" element={user?<Analytics /> : <Navigate to='/' />} />
        <Route path="/profile" element={user?<Profile /> : <Navigate to='/' />} />

        <Route path="/verify-account" element={!user?<VerifyAccount /> : <Navigate to='/' />} />
        <Route path="/forgot-password" element={!user?<ForgotPassword /> : <Navigate to='/' />} />

        <Route path="/login" element={!user? <UserLogin /> : <Navigate to='/home' /> } />
        <Route path="/signup" element={!user? <UserSignup /> : <Navigate to='/home' />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && (user ? <SecondaryFooter /> : <Footer />)}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
