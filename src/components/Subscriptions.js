import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import livechatIcon from '../assets/chat.png';
import dashboardLogo from '../assets/dashboard.png';
import dashboardicon from '../assets/grid-4.png';
import subscriptionicon from '../assets/Wifi.png';
import historyicon from '../assets/Trending-down.png';
import supporticon from '../assets/support.png';
import logouticon from '../assets/logout.png';
import checkicon from '../assets/subcheck.png';
import tagicon from '../assets/subtag.png';
import notificationicon from '../assets/notifcation.png';
import wifiIcon from '../assets/subwifi.png';
import LogoutPopup from './Popup';

import './Subscriptions.css';




const Subscriptions = () => {
 const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [activeTab, setActiveTab] = useState('current'); 


  const subscriptionCards = [
    {
      id: 1,
      title: "Unlimited Data for 30days",
      provider: "Imbil Connect",
      startDate: "May 20, 2025",
      endDate: "February 28, 2025",
      status: "Active",
      price: "₦25,000/ Month",
      statusColor: "#107C41"
    },
    {
      id: 2,
      title: "Unlimited Data for 30days",
      provider: "Imbil Connect",
      startDate: "October 31, 2024",
      endDate: "November 30, 2024",
      status: "Expired",
      price: "₦25,000/ Month",
      statusColor: "#757575"
    },
    {
      id: 3,
      title: "Unlimited Data for 30days",
      provider: "Imbil Connect",
      startDate: "February 28, 2024",
      endDate: "March 29, 2024",
      status: "Expired",
      price: "₦25,000/ Month",
      statusColor: "#757575"
    }
  ];


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
          console.log("Parsed user data:", parsedUserData); // Add this for debugging
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user data:", error); // Add this to catch JSON parse errors
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
      if (isLoading) {
        console.log("Dashboard is in loading state"); 
        return <div className="loading">Loading...</div>;
      }
      console.log("Dashboard is rendering with userData:", userData);
    

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
   
      };

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
    <div className="subscription-title">
      <h1>My Subscription</h1>
    </div>

    <div className="history-header">
      <div className="tab-navigation">
        <div 
          className={`tab ${activeTab === 'current' ? 'active' : ''}`} 
          onClick={() => setActiveTab('current')}
        >
          <div className="tab-text">Current Plan</div>
          <div className="tab-indicator"></div>
        </div>
        <div 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <div className="tab-text"> History</div>
          <div className="tab-indicator"></div>
        </div>
      </div>
      
      {/* Conditional button groups based on active tab */}
      {activeTab === 'current' && (
        <div className="button-group">
          <div className="renew-button">
            <span className="renew-text">Renew Subscription</span>
          </div>
          <div className="cancel-button">
            <span className="cancel-text">Cancel Subscription</span>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-controls">
           <div className="button-group">
          <div className="period-selector">
            <div className="period-dropdown">
              <span>Filter</span>
              <div className="dropdown-icon"></div>
            </div>
          </div>
          <div className='active-selector'>
            <div className="active-status">
              <div className="status-icon"></div>
              <span>Active</span>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>


    {activeTab === 'history' && (
      <>
       <div className="subscription-table">
  {subscriptionCards.map((subscriptionCards) => (
    <div key={subscriptionCards.id} className="subscription-card">
      {/* Title */}
      <div className="subscription-title">
        {subscriptionCards.title}
      </div>
      
      {/* Provider */}
      <div className="subscription-provider">
        {subscriptionCards.provider}
      </div>
      
      {/* Price */}
      <div className="subscription-price">
        {subscriptionCards.price}
      </div>
      
      {/* Date and Status Info */}
      <div className="subscription-info">
        {/* Start Date */}
        <div className="info-group">
          <div className="info-label">Start Date</div>
          <div className="info-value">{subscriptionCards.startDate}</div>
        </div>
        
        {/* End Date */}
        <div className="info-group">
          <div className="info-label">End Date</div>
          <div className="info-value">{subscriptionCards.endDate}</div>
        </div>
        
        {/* Status */}
        <div className="info-group">
          <div className="info-label">Status</div>
          <div 
            className="info-value status-value" 
            style={{ color:subscriptionCards.statusColor }}
          >
            {subscriptionCards.status}
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="subscription-action">
        <button className="cancel-btn">
         Buy Again
        </button>
      </div>
    </div>
  ))}
</div>
    </>
    )}
     {activeTab === 'current' && (
      <>
<div className="current-container">
  <div className="sub-plan-container">
    <div className="plan-details">
      <h2 className="plan-title">Unlimited Data for 30days</h2>
      <p className="plan-provider">Imbil Connect</p>
    </div>

    {/* Right side - Pricing */}
    <div className="pricing-section">
      <div className="wifi-icon">
        <img src={wifiIcon} alt="Name"/>
      </div>
      <span className="price-text">N25,000/ Month</span>
    </div>
  </div>

  <div className="data-usage-section">
    <div className="data-usage-title">Data Usage</div>
    <div className="progress-bar-container">
      <div className="progress-bar-fill"></div>
    </div>
  </div>

  {/* Subscription Details */}
  <div className="subscription-details">
    {/* First Row */}
    <div className="details-row">
      <div className="detail-group">
        <div className="detail-label">Plan Start Date</div>
        <div className="detail-value">12, October 2024</div>
      </div>
      <div className="detail-group">
        <div className="detail-label">Next Billing Date</div>
        <div className="detail-value">12, November 2024</div>
      </div>
    </div>

    {/* Second Row */}
    <div className="details-row">
      <div className="detail-group">
        <div className="detail-label">Days Remaining</div>
        <div className="detail-value">20 Days</div>
      </div>
      <div className="detail-group">
        <div className="detail-label">Status</div>
        <div className="status-button">
          <span>Active</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div className='bottom-cards'> 

<div className="frame-4273">
  {/* Header with icon and plan info */}
  <div className="plan-header">
    <div className="plan-icon">
      <img src={tagicon} alt="Support" />
    </div>
    <div className="plan-info">
      <div className="plan-name">Imbil Connect</div>
      <div className="plan-description">Unlimited Data for N25,000/ month</div>
    </div>
  </div>

  {/* Features list */}
  <div className="features-list">
    <div className="feature-item">
      <div className="check-icon">
        <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">Unlimited Data</span>
    </div>

    <div className="feature-item">
      <div className="check-icon">
       <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">Free Installation</span>
    </div>

    <div className="feature-item">
      <div className="check-icon">
      <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">24/7 Customer Support</span>
    </div>
  </div>

  {/* Cancel button */}
  <div className="cancel-button-container">
    <button className="cancel-button">
      Buy Now 
    </button>
  </div>
</div>

 <div className="frame-4274">
  {/* Header with icon and title */}
  <div className="frame2-plan-header">
    <div className="frame2-plan-icon">
      <img src={tagicon} alt="Support" />
    </div>
    <div className="frame2-plan-info">
      <div className="frame2-plan-name">Imbil Connect</div>
      <div className="frame2-plan-description">Unlimited Data for N25,000/ month</div>
    </div>
  </div>

  {/* Features list */}
    <div className="features-list">
    <div className="feature-item">
      <div className="check-icon">
        <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">Unlimited Data</span>
    </div>

    <div className="feature-item">
      <div className="check-icon">
       <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">Free Installation</span>
    </div>

    <div className="feature-item">
      <div className="check-icon">
      <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">24/7 Customer Support</span>
    </div>
  </div>

  {/* Cancel button */}
  <div className="frame2-button-section">
    <button className="frame2-cancel-btn">
      Buy Now 
    </button>
  </div>   
  </div> 


<div className="frame-4275">
  <div className="frame2-plan-header">
    <div className="frame2-plan-icon">
      <img src={tagicon} alt="Support" />
    </div>
    <div className="frame2-plan-info">
      <h3 className="frame2-plan-name">Imbil Connect</h3>
      <p className="frame2-plan-description">Unlimited Data for N15,000/ month</p>
    </div>
  </div>

  {/* Features list */}
  <div className="features-list">
    <div className="feature-item">
      <div className="check-icon">
        <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">Unlimited Data</span>
    </div>

    <div className="feature-item">
      <div className="check-icon">
       <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">Free Installation</span>
    </div>

    <div className="feature-item">
      <div className="check-icon">
      <img src={checkicon} alt="Support" />
      </div>
      <span className="feature-text">24/7 Customer Support</span>
    </div>
  </div>

  {/* Cancel button */}
  <div className="frame3-button-section">
    <button className="frame3-cancel-btn">
      Buy Now 
    </button>
  </div>   
  </div> 

</div>

</>
    )}

  

    </div>
    </div>
    </div>

  );
};

export default Subscriptions;