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
import successIcon from '../assets/sucessbundle.png';
import failedIcon from '../assets/failed.png';
import pendingIcon from '../assets/pending .png';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [activeTab, setActiveTab] = useState('bundle'); 


  const DEV_MODE = true;

  useEffect(() => {
    console.log("History component mounted");
    console.log("Auth token:", localStorage.getItem('authToken'));
    console.log("Current user data:", localStorage.getItem('currentUser'));

    if (DEV_MODE) {
      // Simulate user data for development
      const mockUserData = {
        name: 'Dev User',
        email: 'dev@example.com',
        preferredPlan: 'Basic Plan'
      };
      
      // Set mock user data
      setUserData(mockUserData);
      localStorage.setItem('currentUser', JSON.stringify(mockUserData));
      setIsLoading(false);
      return;
    }

    // Regular authentication check
    const authToken = localStorage.getItem('authToken');
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

  const handleLiveChatClick = () => {
    console.log('Live chat opened');
  };

    const handleBuyClick = (bundletransaction) => {
    console.log('Buy clicked for:', bundletransaction.bundleName);
    // Navigate to BuyBundle page
    // You can also pass data as state if needed
    navigate('/buybundle', { 
      state: { 
        bundle: bundletransaction 
      } 
    });

  if (isLoading) {
    console.log("History is in loading state");
    return <div className="loading">Loading...</div>;
  }

  // If no user data found and not in dev mode
  if (!userData && !DEV_MODE) {
    return (
      <div className="error-container">
        <h2>Error loading user data</h2>
        <button onClick={() => navigate('/signin')}>Go to Sign In</button>
      </div>
    );
  }
};

  const bundletransactions = [
    { 
      status: 'Success', 
      bundleName: 'Imbil Classic', 
      date: 'Jan 24, 2020', 
      amount: '₦35,000',
      action: 'Buy'
    },
    { 
      status: 'Pending', 
      bundleName: 'Imbil Standard', 
      date: 'Feb 1, 2020', 
      amount: '₦45,000',
      action: 'Buy'
    },
    { 
      status: 'Failed', 
      bundleName: 'Imbil Basic', 
      date: 'Jan 20, 2020', 
      amount: '₦25,000',
      action: 'Buy'
    },
    { 
        status: 'Failed', 
        bundleName: 'Imbil Basic', 
        date: 'Jan 20, 2020', 
        amount: '₦25,000',
        action: 'Buy'
      },
      { 
        status: 'Failed', 
        bundleName: 'Imbil Basic', 
        date: 'Jan 20, 2020', 
        amount: '₦25,000',
        action: 'Buy'
      },
      { 
        status: 'Failed', 
        bundleName: 'Imbil Basic', 
        date: 'Jan 20, 2020', 
        amount: '₦25,000',
        action: 'Buy'
      },
      { 
        status: 'Failed', 
        bundleName: 'Imbil Basic', 
        date: 'Jan 20, 2020', 
        amount: '₦25,000',
        action: 'Buy'
      },
      { 
        status: 'Failed', 
        bundleName: 'Imbil Basic', 
        date: 'Jan 20, 2020', 
        amount: '₦25,000',
        action: 'Buy'
      },
      { 
        status: 'Success', 
        bundleName: 'Imbil Standard', 
        date: 'Jan 20, 2020', 
        amount: '₦25,000',
        action: 'Buy'
      }
  ];

  const topuptransactions = [
    { 
      status: 'Success', 
      narration: 'Imbil Classic', 
      date: 'Jan 24, 2020', 
      description: 'Bank Transfer',
      amount: '₦25,000'
    },
    { 
        status: 'Success', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Bank Transfer',
        amount: '₦25,000'
      },
      { 
        status: 'Pending', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Bank Transfer',
        amount: '₦25,000'
      },
      { 
        status: 'Success', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Bank Transfer',
        amount: '₦25,000'
      },
      { 
        status: 'Failed', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Online Payment',
        amount: '₦25,000'
      },
      { 
        status: 'Success', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Bank Transfer',
        amount: '₦25,000'
      },
      { 
        status: 'Success', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Top Up',
        amount: '₦25,000'
      },
      { 
        status: 'Success', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Online Payment',
        amount: '₦25,000'
      },
      { 
        status: 'Success', 
        narration: 'Imbil Classic', 
        date: 'Jan 24, 2020', 
        description: 'Bank Transfer',
        amount: '₦25,000'
      },
  ];

  const renderStatusBadge = (status) => {
    let badgeClass = '';
    let badgeText = '';
    let iconSrc = null;

    switch(status) {
      case 'Success':
        badgeClass ='status-badge badge-success';
        badgeText = 'Success';
        iconSrc = successIcon;
        break;
      case 'Pending':
        badgeClass = 'status-badge badge-pending';
        badgeText = 'Pending';
        iconSrc = pendingIcon;
        break;
      case 'Failed':
        badgeClass = 'status-badge badge-failed';
        badgeText = 'Failed';
        iconSrc = failedIcon;
        break;
      default:
        badgeClass = 'status-badge';
        badgeText = status;
        iconSrc = null;
    }
    return (
      <span className={badgeClass}>
        {iconSrc && (
          <img 
            src={iconSrc} 
            alt={`${status} icon`} 
            className="status-icon"
          />
        )}
        {badgeText}
      </span>
    );
    };

  return (
    <div className='history-container'> 
      <div className="side-menu">
        <div className="logo">
          <div className="logo-image">
            <img src={dashboardLogo} alt="Name"/>
          </div>
        </div>

        <div className="menu-items">
          <div className="menu-item" onClick={handleDashboardClick}>
            <div className="menu-icon">
              <img src={dashboardicon} alt="Dashboard" />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="menu-item" onClick={handleSubscriptionsClick}>
            <div className="menu-icon">
              <img src={subscriptionicon} alt="Subscriptions" />
            </div>
            <span>Subscriptions</span>
          </div>
          <div className="menu-item active" onClick={handleHistoryClick}>
            <div className="menu-icon">
              <img src={historyicon} alt="History" />
            </div>
            <span>History</span>
            <div className="active-indicator"></div>
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

        
      {userData && (
        <div className="history-content-container">
                 
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
          <h1>Transaction History</h1>
        </div>
        
        <div className="history-header">
          <div className="tab-navigation">
            <div 
              className={`tab ${activeTab === 'bundle' ? 'active' : ''}`} 
              onClick={() => setActiveTab('bundle')}
            >
              <div className="tab-text">Bundle History</div>
              <div className="tab-indicator"></div>
            </div>
            <div 
              className={`tab ${activeTab === 'topup' ? 'active' : ''}`}
              onClick={() => setActiveTab('topup')}
            >
              <div className="tab-text">Top Up History</div>
              <div className="tab-indicator"></div>
            </div>
          </div>
          
          <div className="period-selector">
            <div className="period-dropdown">
              <span>Filter</span>
              <div className="dropdown-icon">

              </div>
            </div>
          </div>
          <div className='active-selector'>
          <div className="active-status">
              <div className="status-icon"></div>
              <span>Active</span>
            </div>
            </div>
        </div>
        
        {activeTab === 'bundle' && (
          <>
            <div className="history-table">
              <div className="table-columns">
                {/* Status Column */}
                <div className="column status-column">
                  <div className="header-cell">Status</div>
                  {bundletransactions.map((bundletransaction, index) => (
                    <div key={`status-${index}`} className="item-cell">
                  
                      {renderStatusBadge(bundletransaction.status)}
      
                   
                    </div>
                  ))}
                </div>
                
                {/* Bundle Name Column */}
                <div className="column bundle-column">
                  <div className="header-cell">Name of Bundle</div>
                  {bundletransactions.map((bundletransaction, index) => (
                    <div key={`bundle-${index}`} className="item-cell">
                      {bundletransaction.bundleName}
                    </div>
                  ))}
                </div>
                
                {/* Date Column */}
                <div className="column date-column">
                  <div className="header-cell">Date</div>
                  {bundletransactions.map((bundletransaction, index) => (
                    <div key={`date-${index}`} className="item-cell">
                      {bundletransaction.date}
                    </div>
                  ))}
                </div>
                
                {/* Amount Column */}
                <div className="column amount-column">
                  <div className="header-cell">Amount</div>
                  {bundletransactions.map((bundletransaction, index) => (
                    <div key={`amount-${index}`} className="item-cell">
                      {bundletransaction.amount}
                    </div>
                  ))}
                </div>
                
                {/* Action Column */}
          <div className="column action-column">
      <div className="header-cell">Action</div>
      {bundletransactions.map((bundletransaction, index) => (
        <div key={`action-${index}`} className="item-cell">
          <div className='action-cell-container'>
            {bundletransaction.action === 'Buy' ? (
              <button 
                className="action-btn buy-btn"
                onClick={() => handleBuyClick(bundletransaction)}
              >
                {bundletransaction.action}
              </button>
            ) : (
              <div className="action-btn">
                {bundletransaction.action}
              </div>
            )}
            <span
              className="view-more-text"
              onClick={() => {
                console.log('View more clicked for:', bundletransaction.bundleName);
              }}
            >
              View More
            </span>
          </div>
        </div>
      ))}
    </div>

              </div>
            </div>
            
            {/* Pagination - Now with prev and next on opposite sides */}
            <div className="pagination">
              <div className="pagination-content">
                <div className="prev-btn">
                  <span>Prev</span>
                </div>
                <div className="page-numbers">
                  <div className="page-num active">1</div>
                  <div className="page-num">2</div>
                  <div className="page-num">3</div>
                  <div className="page-dots">...</div>
                  <div className="page-num">8</div>
                  <div className="page-num">9</div>
                  <div className="page-num">10</div>
                </div>
                <div className="next-btn">
                  <span>Next</span>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'topup' && (
          <>
            <div className="history-table">
              <div className="table-columns">
                {/* Status Column */}
                <div className="column status-column">
                  <div className="header-cell">Status</div>
                  {topuptransactions.map((topuptransaction, index) => (
                    <div key={`status-${index}`} className="item-cell">
                      {renderStatusBadge(topuptransaction.status)}
                    </div>
                  ))}
                </div>
                
                {/* Bundle Name Column */}
                <div className="column bundle-column">
                  <div className="header-cell">Narration</div>
                  {topuptransactions.map((topuptransaction, index) => (
                    <div key={`narration-${index}`} className="item-cell">
                      {topuptransaction.narration}
                    </div>
                  ))}
                </div>
                
                {/* Date Column */}
                <div className="column date-column">
                  <div className="header-cell">Date</div>
                  {topuptransactions.map((topuptransaction, index) => (
                    <div key={`date-${index}`} className="item-cell">
                      {topuptransaction.date}
                    </div>
                  ))}
                </div>
                
                {/* Amount Column */}
                <div className="column amount-column">
                  <div className="header-cell">Description</div>
                  {topuptransactions.map((topuptransaction, index) => (
                    <div key={`description-${index}`} className="item-cell">
                      {topuptransaction.description}
                    </div>
                  ))}
                </div>
                
                {/* Action Column */}
                <div className="column amount-column">
                  <div className="header-cell">Amount</div>
                  {topuptransactions.map((topuptransaction, index) => (
                    <div key={`amount-${index}`} className="item-cell">
                      {topuptransaction.amount}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pagination - Now with prev and next on opposite sides */}
            <div className="pagination">
              <div className="pagination-content">
                <div className="prev-btn">
                  <span>Prev</span>
                </div>
                <div className="page-numbers">
                  <div className="page-num active">1</div>
                  <div className="page-num">2</div>
                  <div className="page-num">3</div>
                  <div className="page-dots">...</div>
                  <div className="page-num">8</div>
                  <div className="page-num">9</div>
                  <div className="page-num">10</div>
                </div>
                <div className="next-btn">
                  <span>Next</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      )}
       {/* </div>  */}
    </div>
  );
};


export default History;