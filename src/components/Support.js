import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import livechatIcon from '../assets/chat.png';
import dashboardLogo from '../assets/dashboard.png';
import dashboardicon from '../assets/grid-4.png';
import subscriptionicon from '../assets/Wifi.png';
import historyicon from '../assets/Trending-down.png';
import supporticon from '../assets/support.png';
import logouticon from '../assets/logout.png';


import notificationicon from '../assets/notifcation.png';
import './Support.css';

const Support = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    // Fetch user data or check authentication
    const fetchUserData = async () => {
      try {
        // actual authentication check
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
        } else {
          navigate('/signin');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        navigate('/signin');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleSubscriptionsClick = () => {
    navigate('/subscriptions');
  };

  const handleHistoryClick = () => {
    navigate('/history');
  };

  const handleSupportClick = () => {
    navigate('/support');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    navigate('/signin');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted', { 
      firstName, 
      lastName, 
      phoneNumber, 
      email, 
      address, 
      dateOfBirth 
    });
  };
// const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
      
//       const paymentMethods = [
//         { id: 'webPay', label: 'Web Pay', left: '24px' },
//         { id: 'bankTransfer', label: 'Bank Transfer', left: '192px' },
//         { id: 'onlinePayment', label: 'Online Payment', left: '360px' }
//       ];
  const handleLiveChatClick = () => {
    console.log('Live chat opened');
    // alternative method: window.open('your-chat-url', '_blank');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading user data</h2>
        <button onClick={() => navigate('/signin')}>Go to Sign In</button>
      </div>
    );
  }

  return (
    <div className='subcriptions-container'>
          <div className="side-menu">
     <div className="logo">
       <div className="logo-image">
       <img src={dashboardLogo} alt="Name"/>
       </div>
     </div>

     <div className="menu-items">
       <div className="menu-item active" onClick={handleDashboardClick}>
         <div className="menu-icon">
           <img src={dashboardicon} alt="Dashboard" />
         </div>
         <span>Dashboard</span>
         <div className="active-indicator"></div>
       </div>
       <div className="menu-item" onClick={handleSubscriptionsClick}>
         <div className="menu-icon">
           <img src={subscriptionicon} alt="Subscriptions" />
         </div>
         <span>Subscriptions</span>
       </div>
       <div className="menu-item" onClick={handleHistoryClick}>
         <div className="menu-icon">
           <img src={historyicon} alt="History" />
         </div>
         <span>History</span>
         <div className="chevron-icon"></div>
       </div>
     </div>

     <div className="bottom-menu-items">
       <div className="menu-item" onClick={handleSupportClick}>
         <div className="menu-icon">
           <img src={supporticon} alt="Support" />
         </div>
         <span>Support</span>
       </div>
       <div className="menu-item" onClick={handleLogout}>
         <div className="menu-icon">
           <img src={logouticon} alt="Logout" />
         </div>
         <span>Logout</span>
       </div>
     </div>

     <div className="live-chat-container" onClick={handleLiveChatClick}>
       <div className="live-chat-icon">
       <img src={livechatIcon} alt="Name"/>
       </div>
       <span>Live chat</span>
     </div>
   </div>


   <div className="subscription-content-container">
   <div className="top-bar">
         <div className="search-bar">
           <input type="text" placeholder="Search" />
           <div className="search-icon"></div>
         </div>
         <div className="user-section">
           <div className="notification-icon">
             <img src={notificationicon} alt="notify"/>
             <div className="notification-badge">2</div>
           </div>
           <div className="user-profile">
             <div className="avatar"></div>
             <div className="user-info">
               <div className="user-name">{userData.name}</div>
               <div className="user-email">{userData.email}</div>
             </div>
           </div>
         </div>
       </div>
    


       <div className="subscription-main-container">
      <div className="info-section">
        <div className="contact-info-column">
          <div className="contact-info">
            {/* Profile Photo Section */}
            <div className="profile-photo">
              <div className="photo-circle"></div>
              <div className="photo-actions">
                <button className="edit-photo-btn">
                  <span>Edit Photo</span>
                </button>
                <button className="delete-photo-btn">
                  <span className="delete-icon"></span>
                </button>
              </div>
            </div>

            {/* Name Fields Row */}
            <div className="form-row">
              <div className="form-field">
                <label>First Name</label>
                <div className="input-container">
                  <input type="text" placeholder="First name" />
                  <span className="user-icon"></span>
                </div>
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <div className="input-container">
                  <input type="text" placeholder="Last name" />
                  <span className="user-icon"></span>
                </div>
              </div>
            </div>

            {/* Contact Fields Row */}
            <div className="form-row">
              <div className="form-field">
                <label>Enter phone number</label>
                <div className="input-container">
                  <input type="tel" placeholder="Phone number" />
                  <span className="phone-icon"></span>
                </div>
              </div>
              <div className="form-field">
                <label>Enter email address</label>
                <div className="input-container">
                  <input type="email" placeholder="Email address" />
                  <span className="mail-icon"></span>
                </div>
              </div>
            </div>

            {/* Address and DOB Row */}
            <div className="form-row">
              <div className="form-field">
                <label>Address</label>
                <div className="input-container">
                  <input type="text" placeholder="Address" />
                </div>
              </div>
              <div className="form-field">
                <label>Date of Birth</label>
                <div className="input-container">
                  <input type="text" placeholder="DD/MM/YYYY" />
                  <span className="calendar-icon"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Footer */}
          <div className="info-footer">
            <div className="info-card">
              <div className="info-icon email-icon"></div>
              <div className="info-text">
                <span>info@imbiltelecom.com</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon map-icon"></div>
              <div className="info-text">
                <span>No 20 Adeshina Street, Off Obafemi Awolowo Way, Ikeja, Lagos</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon phone-icon"></div>
              <div className="info-text">
                <span>+234 20 13100100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

 </div>
    </div>
 );
};

export default Support;