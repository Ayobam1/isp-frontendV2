import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../api/authService";
import logo from '../assets/IMBIL LOGO.png';
import userlogo from '../assets/supporticon.png';
import passwordLogo from '../assets/Lock.png';
import ForgotPasswordModal from './ForgotPasswordModal';
import './Sign.css';

const Sign = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
   
  const navigate = useNavigate();

  useEffect(() => {

    document.body.classList.add('signin-page');
    
    
    return () => {
      document.body.classList.remove('signin-page');
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const data = await loginUser(username, password);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
   } catch (err) {
    console.log("Full error:", err);
    console.log("Error response:", err.response);
    console.log("Error response data:", err.response?.data);
    setError(err.response?.data?.message || "Invalid username or password. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleGetStartedClick = () => {
    // Handle get started click (navigate to sign up page)
    console.log('Get Started clicked');
    // Add your navigation logic here for sign up page
  };

  const handleNextClick = (e) => {
    e.preventDefault(); 

    const mockUserData = {
      name: 'Dev User',
      email: 'dev@example.com',
      preferredPlan: 'Basic Plan'
    };

    // Store mock user data and token
    localStorage.setItem('authToken', 'dev-token');
    localStorage.setItem('currentUser', JSON.stringify(mockUserData));

    console.log('Next button clicked - navigating to dashboard');
    navigate('/dashboard');

    console.log('Next button clicked - navigating to dashboard'); 
    navigate('/dashboard');
  };

  
 return (
    <div className='signin-container'>
      <div className="signin-box">
        <div className="signin-content">
          <div className="logo">
          <img src={logo} alt="logo" />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-field">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="SSID"
                />
                <div className="icon user-icon">
                <img src={userlogo} alt="logo" />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div className="icon lock-icon">
                <img src={passwordLogo} alt="logo" />
                </div>
              </div>
            </div>
            
            <div className="action-links">
             <div 
  className="forgot-password" 
  onClick={() => setShowForgotPassword(true)}
>
  Forgot Password?
</div>
              <div className="retrieve-user">Retrieve User ID</div>
              
              {/* Both submit and onClick will navigate to dashboard */}
             {error && <p style={{ color: "red" }}>{error}</p>}
<button
  type="submit"
  className="login-button"
  disabled={loading}
>
  {loading ? "Signing in..." : "Sign In"}
</button>
              <div className="signup-prompt">
                Do not have an account? <span className="get-started" onClick={() => navigate('/started')}>Get Started</span>
              </div>

            </div>
          </form>
        </div>
        <ForgotPasswordModal 
  isOpen={showForgotPassword} 
  onClose={() => setShowForgotPassword(false)} 
/>
        <div className="footer-links">
          <div>Help and Support</div>
          <div>FAQs</div>
          <div>Privacy Notice</div>
         <div className="footer-link-clickable" onClick={() => navigate('/started')}>
    Getting Started
  </div>
        </div>
      </div>
      <div className="copyright">Copyright © 2024 Simplecall. All rights reserved</div>
    </div>
  );
};

export default Sign;