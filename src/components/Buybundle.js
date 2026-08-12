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
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      useEffect(() => {
    
        console.log("Dashboard component mounted");
      console.log("Auth token:", localStorage.getItem('token'));
      console.log("Current user data:", localStorage.getItem('currentUser'));
    
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          navigate('/signin');
          return;
        }
    
        const storedUserData = localStorage.getItem('currentUser');
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          console.log("Parsed user data:", parsedUserData); 
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user data:", error); 
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
    amount: "₦48,375",
    speed: "15mbps High Speed Data",
    validity: "30 Days Premium",
    badge: "Bestseller",
    description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
  },
  {
    id: 2,
    bundleName: "Imbil Premium",
    amount: "₦64,500",
    speed: "30mbps High Speed Data",
    validity: "30 Days Premium",
    badge: null,
    description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
  },
  {
    id: 3,
    bundleName: "Imbil Basic",
    amount: "₦26,875",
    speed: "5mbps High Speed Data",
    validity: "30 Days Premium",
    badge: null,
    description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
  },
  {
    id: 4,
    bundleName: "Imbil Standard",
    amount: "₦42,500",
    speed: "15mbps High Speed Data",
    validity: "30 Days Premium",
    badge: null,
    description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
  },
  {
    id: 5,
    bundleName: "Imbil Classic",
    amount: "₦18,900",
    speed: "8mbps High Speed Data",
    validity: "30 Days Premium",
    badge: null,
    description: "Unlimited Data,Speed = Burstable upto 200 GB,FUP=1MBPS , Time=24Hrs"
  },
  {
    id: 6,
    bundleName: "Imbil Standard",
    amount: "₦9,000",
    speed: "15mbps High Speed Data",
    validity: "30 Days Premium",
    badge: null,
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
        localStorage.removeItem('token');
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
    <div className={`bb-side-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
  <button className="bb-mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
  <div className="bb-logo">
    <div className="bb-logo-image"><img src={dashboardLogo} alt="Name"/></div>
  </div>

  <div className="bb-menu-items">
    <div className="bb-menu-item active" onClick={handleDashboardClick}>
      <div className="bb-menu-icon"><img src={dashboardicon} alt="Dashboard" /></div>
      <span>Dashboard</span>
      <div className="bb-active-indicator"></div>
    </div>
    <div className="bb-menu-item" onClick={handleSubscriptionsClick}>
      <div className="bb-menu-icon"><img src={subscriptionicon} alt="Subscriptions" /></div>
      <span>Subscriptions</span>
    </div>
    <div className="bb-menu-item" onClick={handleHistoryClick}>
      <div className="bb-menu-icon"><img src={historyicon} alt="History" /></div>
      <span>History</span>
      <div className="bb-chevron-icon"></div>
    </div>
  </div>

  <div className="bb-bottom-menu-items">
    <div className="bb-menu-item" onClick={handleSupportClick}>
      <div className="bb-menu-icon"><img src={supporticon} alt="Support" /></div>
      <span>Support</span>
    </div>
    <div className="bb-menu-item" onClick={handleLogout}>
      <div className="bb-menu-icon"><img src={logouticon} alt="Logout" /></div>
      <span>Logout</span>
    </div>
  </div>
</div>

{mobileMenuOpen && (
  <div className="bb-mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
)}


    <div className='bundles-main-container'>
        <div className="top-bar">
           <button className="hamburger-btn-bb" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
    <span></span><span></span><span></span>
  </button>
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
{/* ── Mobile Hero + Cards ── */}
<div className="bb-mobile-main">
  <div className="bb-hero">
    <div className="bb-hero-badge">Data Plans</div>
    <h2 className="bb-hero-title">Buy Data Bundle</h2>
    <p className="bb-hero-subtitle">
      Select a plan tailored to your digital lifestyle. Experience the Responsive Sentinel speed.
    </p>
  </div>

  <div className="bb-bundle-list">
  {data.map((item) => (
    <div key={item.id} className="bb-bundle-card">
      <div className="bb-bundle-top">
        <div className="bb-bundle-info">
          <div className="bb-bundle-name-row">
            <h3 className="bb-bundle-name">{item.bundleName}</h3>
            {item.badge && <span className="bb-bundle-badge">{item.badge}</span>}
          </div>
          <span className="bb-bundle-price">{item.amount}</span>
        </div>
      </div>
      <div className="bb-bundle-features">
        <div className="bb-feature-row">
          <span className="bb-feature-dot"></span>
          <span className="bb-feature-text">{item.speed}</span>
        </div>
        <div className="bb-feature-row">
          <span className="bb-feature-dot"></span>
          <span className="bb-feature-text">Validity: {item.validity}</span>
        </div>
      </div>
      <button className="bb-buy-btn" onClick={() => handleBuyClick(item)}>
        Buy Now
      </button>
    </div>
  ))}
</div>

  <div className="bb-custom-banner">
  <h4 className="bb-custom-title">Need a custom plan for your business?</h4>
  <p className="bb-custom-text">Dedicated bandwidth for professionals.</p>
  <button className="bb-custom-btn">Contact Sales</button>
</div>
</div>
    </div>
</div>


);
};

export default Buybundle;