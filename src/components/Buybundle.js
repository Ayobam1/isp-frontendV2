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
 import './Buybundle.css';


const Buybundle = () => {
     const navigate = useNavigate();
      const [userData, setUserData] = useState(null);
      const [error,setError] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
      const [activeTab, setActiveTab] = useState('current'); 

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
    

    const data = [
    {
      id: 1,
      bundleName: "Imbil Standard",
      amount: "₦15,600",
      description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
    },
    {
      id: 2,
      bundleName: "Imbil Standard",
      amount: "₦30,000",
      description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
    },
    {
      id: 3,
      bundleName: "Imbil Standard",
      amount: "₦13,500",
      description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
    },
    {
      id: 4,
      bundleName: "Imbil Standard",
      amount: "₦42,500",
      description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
    },
    {
      id: 5,
      bundleName: "Imbil Standard",
      amount: "₦18,900",
      description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
    },
    {
      id: 6,
      bundleName: "Imbil Standard",
      amount: "₦9,000",
      description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
    }
  ];
    
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

    const handleBuyClick = (item) => {
    navigate('/payments', {
      state: {
        bundleId: item.id,
        bundleName: item.name,
        price: item.price,
      }
    });
  };

     return (
<div className='bundles-container'>
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
    </div>


    <div className='bundles-main-container'>
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
          
            <div className="transaction-title">
          <h1>Buy Bundles </h1>
        </div>

        <div className="bundle-frame-container">
      <div className="bundle-table">
        {/* Bundle Name Column */}
        <div className="bundle-column column-bundle">
          <div className="bundle-header-cell">
            <span className="bundle-header-text">Name of Bundle</span>
          </div>
          {data.map((item) => (
            <div key={`bundle-${item.id}`} className="bundle-item-cell">
              <span className="bundle-item-text">{item.bundleName}</span>
            </div>
          ))}
        </div>

        {/* Amount Column */}
        <div className="bundle-column column-amount">
          <div className="bundle-header-cell">
            <span className="bundle-header-text">Amount</span>
          </div>
          {data.map((item) => (
            <div key={`amount-${item.id}`} className="bundle-item-cell">
              <span className="bundle-item-text">{item.amount}</span>
            </div>
          ))}
        </div>

        {/* Description Column */}
        <div className="bundle-column column-description">
          <div className="bundle-header-cell">
            <span className="bundle-header-text">Description</span>
          </div>
          {data.map((item) => (
            <div key={`desc-${item.id}`} className="bundle-item-cell">
              <span className="bundle-description-text">{item.description}</span>
            </div>
          ))}
        </div>

        {/* Action Column */}
        <div className="bundle-column column-action">
          <div className="bundle-header-cell">
            <span className="bundle-header-text action-header">Action</span>
          </div>
          {data.map((item) => (
        <div key={`action-${item.id}`} className="bundle-item-cell action-cell">
          <button 
            className="bundle-badge"
            onClick={() => handleBuyClick(item)}
          >
            <div className="bundle-check-icon" style={{ display: 'none' }}>
              <div className="bundle-vector"></div>
            </div>
            <span className="bundle-badge-text">Buy</span>
          </button>
        </div>
      ))}
        </div>
      </div>
    </div>

    </div>
</div>


);
};

export default Buybundle;