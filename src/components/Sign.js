import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/IMBIL LOGO.png';
import userlogo from '../assets/supporticon.png';
import passwordLogo from '../assets/Lock.png';
import './Sign.css';

const Sign = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   
  const navigate = useNavigate();

  useEffect(() => {

    document.body.classList.add('signin-page');
    
    
    return () => {
      document.body.classList.remove('signin-page');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Attempting to navigate to dashboard'); 
    navigate('/dashboard');
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
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                />
                <div className="icon lock-icon">
                <img src={passwordLogo} alt="logo" />
                </div>
              </div>
            </div>
            
            <div className="action-links">
              <div className="forgot-password">Forgot Password?</div>
              <div className="retrieve-user">Retrieve User ID</div>
              
              {/* Both submit and onClick will navigate to dashboard */}
              <button
                type="button"
                className="login-button"
                onClick={handleNextClick}
              >
                Sign in
              </button>
              <div className="signup-prompt">
                Do not have an account? <span className="get-started" onClick={handleGetStartedClick}>Get Started</span>
              </div>

            </div>
          </form>
        </div>
        
        <div className="footer-links">
          <div>Help and Support</div>
          <div>FAQs</div>
          <div>Privacy Notice</div>
          <div>Getting Started</div>
        </div>
      </div>
      <div className="copyright">Copyright © 2024 Simplecall. All rights reserved</div>
    </div>
  );
};

export default Sign;