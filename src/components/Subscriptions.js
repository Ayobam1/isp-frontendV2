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
import {cancelSubscription} from '../api/authService';
import { reactivateSubscription } from '../api/authService';
import './Subscriptions.css';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentSubscription = userData?.subscriptions?.[0];
  const subscriptionHistory = userData?.subscriptions || [];

  const handleBuyClick = (bundletransaction) => {
  navigate('/buybundle', { state: { bundle: bundletransaction } });
};

  const recommendedBundles = [
    { tier: 'PREMIUM CHOICE', name: 'Imbil Premium', price: 'N64,500/30 Days', borderColor: '#0C4381', iconBg: '#D6E3FF', textColor: '#0C4381' },
    { tier: 'STANDARD PLAN', name: 'Imbil Standard', price: 'N48,375/Month', borderColor: '#4E5E81', iconBg: '#FFDBD0', textColor: '#7E2300' },
    { tier: 'BUDGET SAVER', name: 'Imbil Basic', price: 'N26,875/Month', borderColor: '#7E2300', iconBg: '#FFDBD0', textColor: '#7E2300' },
    { tier: 'CLASSIC PLAN', name: 'Imbil Classic', price: 'N37,635/Month', borderColor: '#7E2300', iconBg: '#FFDBD0', textColor: '#7E2300' },
    { tier: 'SUPREME PLAN', name: 'Imbil Supreme', price: 'N84,387/Month', borderColor: '#0C4381', iconBg: '#D6E3FF', textColor: '#0C4381' },
    { tier: 'PLATINUM CHOICE', name: 'Imbil Platinum', price: 'N97,610/Month', borderColor: '#0C4381', iconBg: '#D6E3FF', textColor: '#0C4381' },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) { navigate("/signin"); return; }
    try { setUserData(JSON.parse(storedUser)); }
    catch (error) { console.error("Error parsing user data:", error); navigate("/signin"); }
    setIsLoading(false);
  }, [navigate]);

  const handleDashboardClick = () => navigate('/dashboard');
  const handleSubscriptionsClick = () => navigate('/subscriptions');
  const handleHistoryClick = () => navigate('/history');
  const handleSupportClick = () => navigate('/support');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    navigate('/signin');
  };
  const handleLiveChatClick = () => console.log('Live chat opened');

  //cancel subscription
const handleCancelSubscription = async () => {
  console.log('Cancel clicked, currentSubscription:', currentSubscription);
  console.log('Full userData:', userData);
  if (!currentSubscription) return;

  try {
    const response = await cancelSubscription(
      currentSubscription.id,
      currentSubscription.planType
    );
    console.log('Subscription canceled:', response);
  } catch (error) {
    console.error('Cancel failed:', error.response?.data);
  }
};


const handleRenewSubscription = async () => {
  if (!currentSubscription) return;

  try {
    const response = await reactivateSubscription(
      currentSubscription.id,
      currentSubscription.planType
    );
    console.log('Reactivated:', response);
    // Refresh subscription status
  } catch (error) {
    // Will hit VALIDATION_001 if status isn't ATTENTION/CANCELED
    console.error('Reactivate failed:', error.response?.data?.message);
  }
};

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!userData) return (
    <div className="error-container">
      <h2>Error loading user data</h2>
      <button onClick={() => navigate('/signin')}>Go to Sign In</button>
    </div>
  );

const daysRemaining = currentSubscription?.nextPaymentDate
  ? Math.max(0, Math.ceil(
      (new Date(currentSubscription.nextPaymentDate) - new Date()) / (1000 * 60 * 60 * 24)
    ))
  : 0;

  return (
    <div className='subcriptions-container'>

      {/* ── Sidebar ── */}
      <div className={`sub-side-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <button className="sub-mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
        <div className="sub-logo">
          <div className="sub-logo-image"><img src={dashboardLogo} alt="Logo"/></div>
        </div>
        <div className="sub-menu-items">
          <div className="sub-menu-item" onClick={handleDashboardClick}>
            <div className="sub-menu-icon"><img src={dashboardicon} alt="Dashboard"/></div>
            <span>Dashboard</span>
          </div>
          <div className="sub-menu-item active" onClick={handleSubscriptionsClick}>
            <div className="sub-menu-icon"><img src={subscriptionicon} alt="Subscriptions"/></div>
            <span>Subscriptions</span>
            <div className="sub-active-indicator"></div>
          </div>
          <div className="sub-menu-item" onClick={handleHistoryClick}>
            <div className="sub-menu-icon"><img src={historyicon} alt="History"/></div>
            <span>History</span>
            <div className="sub-chevron-icon"></div>
          </div>
        </div>
        <div className="sub-bottom-menu-items">
          <div className="sub-menu-item" onClick={handleSupportClick}>
            <div className="sub-menu-icon"><img src={supporticon} alt="Support"/></div>
            <span>Support</span>
          </div>
          <div className="sub-menu-item" onClick={handleLogout}>
            <div className="sub-menu-icon"><img src={logouticon} alt="Logout"/></div>
            <span>Logout</span>
          </div>
        </div>
        <div className="sub-live-chat-container" onClick={handleLiveChatClick}>
          <div className="sub-live-chat-icon"><img src={livechatIcon} alt="Live chat"/></div>
          <span>Live chat</span>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className="sub-mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="subscription-content-container">

        {/* Top bar */}
        <div className="top-bar">
          <button className="hamburger-btn-sub" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                <div className="user-name">{userData.firstName} {userData.lastName}</div>
                <div className="user-email">{userData.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="subscription-main-container">

          {/* Page title */}
          <div className="sub-page-title">
            <h1>My Subscription</h1>
          </div>

          {/* ── Tab Navigation ── */}
          <div className="sub-tab-nav">
            <button
              className={`sub-tab-btn ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              Current Plan
            </button>
            <button
              className={`sub-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          {/* ── CURRENT PLAN TAB ── */}
          {activeTab === 'current' && (
            <div className="sub-current-content">

              {/* Desktop action buttons */}
             <div className="sub-desktop-actions">
  <button className="sub-renew-subscription-btn" onClick={handleRenewSubscription}>Renew Subscription</button>
  <button className="sub-cancel-subscription-btn" onClick={handleCancelSubscription}>Cancel Subscription</button>
</div>

              {/* ── Current Plan Card ── */}
              <div className="sub-plan-card">

                {/* Plan title + price */}
              <div className="sub-plan-top">
    <div className="sub-plan-left">
      <h2 className="sub-plan-name">
        {currentSubscription?.planType || 'Unlimited Data For 30days'}
      </h2>
      <p className="sub-plan-provider">Imbil Connect</p>
    </div>
    <div className="sub-plan-right">
      <img src={wifiIcon} alt="wifi" className="sub-wifi-icon" />
      <div className="sub-price-col">
        <span className="sub-price">₦25,000</span>
        <span className="sub-per-month">Month</span>
      </div>
    </div>
  </div>

                {/* Progress bar */}
                <div className="sub-usage-section">
    <div className="sub-usage-row">
      <span className="sub-usage-label">Data Usage</span>
      <span className="sub-usage-value">18.5 GB / 50 GB</span>
    </div>
    <div className="sub-progress-bar">
      <div className="sub-progress-fill" style={{ width: '37%' }}></div>
    </div>
  </div>

                {/* Plan details grid */}
               <div className="sub-details-grid">
    <div className="sub-detail-group">
      <span className="sub-detail-label">Plan Start Date</span>
      <span className="sub-detail-value">
        {currentSubscription?.startDate
          ? new Date(currentSubscription.startDate).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric'
            })
          : '—'}
      </span>
    </div>
    <div className="sub-detail-group">
      <span className="sub-detail-label">Next Billing Date</span>
      <span className="sub-detail-value">
        {currentSubscription?.nextPaymentDate
          ? new Date(currentSubscription.nextPaymentDate).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric'
            })
          : '—'}
      </span>
    </div>
    <div className="sub-detail-group">
      <span className="sub-detail-label">Days Remaining</span>
      <span className="sub-detail-value sub-days-value">{daysRemaining} Days</span>
    </div>
    <div className="sub-detail-group">
      <span className="sub-detail-label">Status</span>
      <span className="sub-status-badge">
        {currentSubscription?.status || 'INACTIVE'}
      </span>
    </div>
  </div>

                {/* Action buttons — mobile style */}
              <div className="sub-card-actions">
    <button className="sub-renew-btn">Renew Subscription</button>
    <button className="sub-cancel-icon-btn">✕</button>
  </div> 
  
</div>
            

              {/* ── Recommended Bundles ── */}
              <div className="sub-recommended">
                <div className="sub-recommended-header">
                  <h3>Recommended Bundles</h3>
                  <button className="sub-view-all-btn">View All →</button>
                </div>
                <div className="sub-bundle-list">
                  {recommendedBundles.map((bundle, i) => (
                    <div
                      key={i}
                      className="sub-bundle-card"
                      style={{ borderLeft: `4px solid ${bundle.borderColor}` }}
                    >
                      <div className="sub-bundle-left">
                        <div
                          className="sub-bundle-icon"
                          style={{ background: bundle.iconBg }}
                        >
                          <img src={wifiIcon} alt="plan" />
                        </div>
                        <div className="sub-bundle-info">
                          <span
                            className="sub-bundle-tier"
                            style={{ color: bundle.textColor }}
                          >
                            {bundle.tier}
                          </span>
                          <span className="sub-bundle-name">{bundle.name}</span>
                          <span className="sub-bundle-price">{bundle.price}</span>
                        </div>
                      </div>
                      <button className="sub-bundle-buy-btn">Buy</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Desktop bottom cards (frame-4273, 4274, 4275) ── */}
              <div className='bottom-cards'>
                <div className="frame-4273">
                  <div className="plan-header">
                    <div className="plan-icon"><img src={tagicon} alt="tag"/></div>
                    <div className="plan-info">
                      <div className="plan-name">Imbil Connect Basic</div>
                      <div className="plan-description">Unlimited Data for N26,875/month</div>
                    </div>
                  </div>
                  <div className="features-list">
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">Unlimited Data</span></div>
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">Free Installation</span></div>
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">24/7 Customer Support</span></div>
                  </div>
                  <div className="cancel-button-container">
                   <button className="frame2-cancel-btn" onClick={() => navigate('/buybundle')}> Buy Now</button>
                  </div>
                </div>
                <div className="frame-4274">
                  <div className="frame2-plan-header">
                    <div className="frame2-plan-icon"><img src={tagicon} alt="tag"/></div>
                    <div className="frame2-plan-info">
                      <div className="frame2-plan-name">Imbil Connect Classic</div>
                      <div className="frame2-plan-description">Unlimited Data for N37,625/month</div>
                    </div>
                  </div>
                  <div className="features-list">
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">Unlimited Data</span></div>
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">Free Installation</span></div>
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">24/7 Customer Support</span></div>
                  </div>
                  <div className="frame2-button-section">
                    <button className="frame2-cancel-btn" onClick={() => navigate('/buybundle')}>Buy Now</button>
                  </div>
                </div>
                <div className="frame-4275">
                  <div className="frame2-plan-header">
                    <div className="frame2-plan-icon"><img src={tagicon} alt="tag"/></div>
                    <div className="frame2-plan-info">
                      <h3 className="frame2-plan-name">Imbil Connect Standard</h3>
                      <p className="frame2-plan-description">Unlimited Data for N84,387.50/month</p>
                    </div>
                  </div>
                  <div className="features-list">
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">Unlimited Data</span></div>
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">Free Installation</span></div>
                    <div className="feature-item"><div className="check-icon"><img src={checkicon} alt="check"/></div><span className="feature-text">24/7 Customer Support</span></div>
                  </div>
                  <div className="frame3-button-section">
                   <button className="frame2-cancel-btn" onClick={() => navigate('/buybundle')}>Buy Now</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === 'history' && (
            <div className="sub-history-content">
              <div className="sub-desktop-actions">
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
              <div className="subscription-table">
                {subscriptionHistory.map((sub) => (
                  <div key={sub.id} className="subscription-card">
                    <div className="subscription-title">{sub.planType}</div>
                    <div className="subscription-provider">Imbil Connect</div>
                    <div className="subscription-price">₦25,000/Month</div>
                    <div className="subscription-info">
                      <div className="info-group">
                        <div className="info-label">Start Date</div>
                        <div className="info-value">{new Date(sub.startDate).toLocaleDateString()}</div>
                      </div>
                      <div className="info-group">
                        <div className="info-label">End Date</div>
                        <div className="info-value">{new Date(sub.nextPaymentDate).toLocaleDateString()}</div>
                      </div>
                      <div className="info-group">
                        <div className="info-label">Status</div>
                        <div className="info-value status-value"
                          style={{ color: sub.status === 'ACTIVE' ? '#107C41' : '#757575' }}>
                          {sub.status}
                        </div>
                      </div>
                    </div>
                    <div className="subscription-action">
                      <button className="cancel-btn">Buy Again</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Subscriptions;