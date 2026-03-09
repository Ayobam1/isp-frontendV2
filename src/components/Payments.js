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
import BankIcon from '../assets/Bank.png';
import BankCardsIcon from '../assets/Bank Cards.png';
import EmailIcon from '../assets/Email.png';
import Popup from './Popup';
import './Payments.css';




const Payments = () => {
 const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


      useEffect(() => {
    
        console.log("Dashboard component mounted");
      console.log("Auth token:", localStorage.getItem('authToken'));
      console.log("Current user data:", localStorage.getItem('currentUser'));
    
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/signin');
          return;
        }
    
        const storedUserData = localStorage.getItem('currentUser');
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          console.log("Parsed user data:", parsedUserData); // for debugging
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user data:", error); // to catch JSON parse errors
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
      
      setIsLoading(false);
    }, [navigate]);
    
    
      const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
      };
    
      const getFirstName = () => {
        if (!userData || !userData.name) return '';
        return userData.name.split(' ')[0];
      };
    
    
      const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false);
    
      const openWalletPopup = () => {
        setIsWalletPopupOpen(true);
      };
    
      const closeWalletPopup = () => {
        setIsWalletPopupOpen(false);
      };
    
    
      const handleTopupHistory = () => {
        // Navigate to topup history page
        console.log('Topup History clicked');
        // navigate('/topup-history');
      };
      
      const handleContactUs = () => {
        // Navigate to contact page or open contact form
        console.log('Contact Us clicked');
        // navigate('/contact');
      };
      
      const handleBuyBundles = () => {
        // Navigate to buy bundles page
        console.log('Buy Bundles clicked');
        // navigate('/bundles');
      };
      
      const handleViewProfile = () => {
        // Navigate to profile page
        console.log('View Profile clicked');
        // navigate('/profile');
      };
    
      const handleDashboardClick = () => {
        // Navigate to dashboard or reload current page
        navigate('/dashboard');
      };
    
      const handleSubscriptionsClick = () => {
        // Navigate to subscriptions page
        navigate('/subscriptions');
      };
    
      const handleHistoryClick = () => {
        // Navigate to history page
        navigate('/history');
      };
    
      const handleSupportClick = () => {
        // Navigate to support page or open support modal
        navigate('/support');
      };

    const handleLogoutClick = () => {
    setIsPopupOpen(true);
  };
      const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        navigate('/signin');
      };
      if (isLoading) {
        console.log("Dashboard is in loading state"); // to confirm loading state
        return <div className="loading">Loading...</div>;
      }
      console.log("Dashboard is rendering with userData:", userData);
    
      // If no user data found (should not happen if redirected correctly)
      if (!userData) {
        return (
          <div className="error-container">
            <h2>Error loading user data</h2>
            <button onClick={() => navigate('/signin')}>Go to Sign In</button>
          </div>
        );
      }
    
      const handleLiveChatClick = () => {
        console.log('Live chat opened');
        //could also use: window.open('your-chat-url', '_blank');
      };


    return (
       <div className='payment-container'>
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
          <div className="menu-item" onClick={handleLogoutClick}>
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

  {isPopupOpen && (
        <Popup 
          onClose={() => setIsPopupOpen(false)}
          onLogout={handleLogout}
        />
      )}

      <div className="main-content">
        {/* Header */}
        <div className="header">
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
        </div>
        <div className="payments-main-container">
        <p className='payment-title'> Payment </p>
      <div className="payments-content">
       
        <div className="payment-cards-container">
          {/* Bank Transfer Card */}
          <div className="payment-card">
            <div className="payment-card-icon">
              <img src={BankIcon} alt="Bank" />
            </div>
            <div className="payment-card-text">
              <span>Bank Transfer</span>
            </div>
          </div>

          {/* Bank Cards Card */}
          <div className="payment-card">
            <div className="payment-card-icon">
              <img src={BankCardsIcon} alt="Bank Cards" />
            </div>
            <div className="payment-card-text">
              <span>Online Payment</span>
            </div>
          </div>

          {/* IMBIL PAY Card */}
          <div className="payment-card">
            <div className="payment-card-icon">
              <img src={EmailIcon} alt="Email" />
            </div>
            <div className="payment-card-text">
              <span>IMBIL PAY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
        
       </div>
    );
;}

export default Payments;