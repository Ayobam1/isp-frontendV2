import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import livechatIcon from '../assets/chat.png';
import dashboardLogo from '../assets/dashboard.png';
import bundleLogo from '../assets/bundles.png';
import contactLogo from '../assets/contactus.png';
import topuplogo from '../assets/topup.png';
import profileLogo from '../assets/viewprofile.png';
import dashboardicon from '../assets/grid-4.png';
import subscriptionicon from '../assets/Wifi.png';
import historyicon from '../assets/Trending-down.png';
import supporticon from '../assets/support.png';
import logouticon from '../assets/logout.png';
import walleticon from '../assets/balanceIcon.png';
import fundicon from '../assets/fundIcon.png';
import dashicon from '../assets/dashIcon.png';
import hideicon from '../assets/hideyes.png';
import notificationicon from '../assets/notifcation.png';
import WalletPopup from './WalletPopup';

import Popup from './Popup';
import './Dashboard.css';

const Dashboard = () => {
  const DEV_MODE = false;

  const [hideBalance, setHideBalance] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


 useEffect(() => {
  const storedUser = localStorage.getItem("currentUser");
  if (!storedUser) {
    navigate("/signin");
    return;
  }
  try {
    setUserData(JSON.parse(storedUser));
  } catch (error) {
    console.error("Error parsing user data:", error);
    navigate("/signin");
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
  if (!userData) return '';
  return userData.firstName || '';
};

  const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false);

  const openWalletPopup = () => {
    setIsWalletPopupOpen(true);
  };

  const closeWalletPopup = () => {
    setIsWalletPopupOpen(false);
  };


  const handleTopupHistory = () => {
    
    console.log('Topup History clicked');
    // navigate('/topup-history');
  };
  
  const handleContactUs = () => {
   
    console.log('Contact Us clicked');
    // navigate('/contact');
  };
  
  const handleBuyBundles = () => {
   
    console.log('Buy Bundles clicked');
    // navigate('/bundles');
  };
  
  const handleViewProfile = () => {
   
    console.log('View Profile clicked');
    // navigate('/profile');
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

const handleLogoutClick = () => {
  console.log("Logout clicked, isPopupOpen:", isPopupOpen);
  setIsPopupOpen(true);
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

  if (!userData && !DEV_MODE) {
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
 
  
  const toggleBalance = () => {
    setHideBalance(!hideBalance);
  };

  // Transaction data
const transactions = userData.transactions || [];

  return (
    <div className="dashboard-container">
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


   
      {/* Main Content */}
      <div className="dashboard-content-container">
      <div className="top-barr">
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
                  <div className="user-name">{userData.firstName} {userData.lastName}</div>
                  <div className="user-email">{userData.email}</div>
                </div>
              </div>
            </div>
          </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="greeting">{getGreeting()}, {getFirstName()}</div>

          <div className="dashboard-cards">
            {/* Wallet Balance Card */}
            <div className="wallet-card">
              <div className="wallet-info">
                <div className="wallet-icon">
                <img src={walleticon} alt="Wallet" />
                </div>
                <div className="wallet-label">Wallet balance</div>
               <div className="wallet-amount">
  {hideBalance ? '****' : `₦${Number(userData.walletBalance).toLocaleString()}`}
</div>
              </div>
              <div className="hide-balance-btn" onClick={toggleBalance}>
                <span>{hideBalance ? 'Show Balance' : 'Hide Balance'}</span>
                <div className="eye-icon">
                <img src={hideicon} alt="hide" />
                </div>
              </div>
              <div className="action-buttons">
                <div>
                <button className="fund-wallet-btn" onClick={openWalletPopup}>
                  <div className="plus-icon">
                  <img src={fundicon} alt="History" />
                  </div>
                  <span>Fund Wallet</span>
                </button>
                <WalletPopup 
        isOpen={isWalletPopupOpen} 
        onClose={closeWalletPopup} 
      />
                </div>
                <div className="quick-actions">
                <div className="action-item" onClick = {handleTopupHistory}>
                    <div className="action-icon">
                       <img src={topuplogo} alt="Wallet" /> 
                    </div>
                    <span>Topup History</span>
                  </div>

                  <div className="action-item" onClick={handleContactUs}>
                    <div className="action-icon">
                       <img src={contactLogo} alt="Wallet" /> 
                    </div>
                    <span>Contact Us</span>
                  </div>

                  <div className="action-item" onClick = {handleBuyBundles}>
                    <div className="action-icon">
                       <img src={bundleLogo} alt="Wallet" /> 
                    </div>
                    <span>Buy Bundles</span>
                  </div>

                  <div className="action-item" onClick = {handleViewProfile}>
                    <div className="action-icon">
                       <img src={profileLogo} alt="Wallet" /> 
                    </div>
                    <span>View Profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bundle Status Card */}
            <div className="bundle-card">
              <div className="bundle-header">
                <div className="period-selector">
                  <span>Last 30 days</span>
                  <div className="arrow-down-icon"></div>
                </div>
                <div className="status-badge">
                  <div className="check-icon"></div>
                  <span>Active</span>
                </div>
              </div>
              <div className="bundle-content">
                <div className="bundle-details">
                 <div className="detail-item">
                  <div className="detail-dot active-dot"></div>
                   <div className="detail-info">
                  <span className="detail-label">Active Bundle: {userData.subscriptions?.[0]?.planType || 'No active plan'}</span>
                   </div>
                   </div>

                  <div className="detail-item">
                    <div className="detail-dot used-dot"></div>
                    <div className="detail-info">
                      <span className="detail-label">Days Used</span>
                      <span className="detail-value">20 Days</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-dot left-dot"></div>
                    <div className="detail-info">
                      <span className="detail-label">Days Left</span>
                      <span className="detail-value">10 Days</span>
                    </div>
                  </div>
                </div>
                <div className="bundle-chart">
                  <div className="chart-circle">
                    {/* This would be replaced with an actual chart in the real implementation */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-section">
            <div className="activities-header">
              <h2>Recent Activities</h2>
              <div className="view-all">View all transactions</div>
            </div>
            <div className="activities-table">
             {transactions.map((transaction) => (
  <div className="activity-row" key={transaction.id}>
    <div className="activity-icon fund-icon">
      <div className="arrow-right-up">
        <img src={dashicon} alt="Name"/>
      </div>
    </div>
    <div className="activity-type">{transaction.type}</div>
    <div className="activity-amount">₦{Number(transaction.amount).toLocaleString()}</div>
    <div className="activity-date">{new Date(transaction.createdAt).toLocaleDateString()}</div>
    <div className="activity-status">{transaction.status}</div>
    <div className="activity-action">View More</div>
  </div>
))}
            </div>
          </div>
        </div>
      </div>
         {isPopupOpen && (
        <Popup 
          onClose={() => setIsPopupOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Dashboard;