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
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bundle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const DEV_MODE = false;

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) { navigate("/signin"); return; }
    try {
      setUserData(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/signin");
    }
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
  const handleBuyClick = (bundletransaction) => {
    navigate('/buybundle', { state: { bundle: bundletransaction } });
  };

  const bundletransactions = (userData?.transactions || [])
    .filter(t => t.type === "SUBSCRIPTION")
    .map(t => ({
      status: t.status === "SUCCESS" ? "Success" : t.status === "PENDING" ? "Pending" : "Failed",
      bundleName: "Imbil Classic",
      date: new Date(t.createdAt).toLocaleDateString(),
      amount: `₦${Number(t.amount).toLocaleString()}`,
      action: "Buy",
      raw: t
    }));

  const topuptransactions = (userData?.transactions || [])
    .filter(t => t.type === "CREDIT")
    .map(t => ({
      status: t.status === "SUCCESS" ? "Success" : t.status === "PENDING" ? "Pending" : "Failed",
      narration: t.reference || "Wallet Top Up",
      date: new Date(t.createdAt).toLocaleDateString(),
      description: t.from || "Bank Transfer",
      amount: `₦${Number(t.amount).toLocaleString()}`,
      raw: t
    }));

  const getStatusColors = (status) => {
    switch (status) {
      case 'Success': return { border: '#0C4381', badge: '#F0FDF4', badgeBorder: '#DCFCE7', text: '#15803D' };
      case 'Pending': return { border: '#7E2300', badge: '#FFDBD0', badgeBorder: '#FFB59E', text: '#3A0B00' };
      case 'Failed':  return { border: '#BA1A1A', badge: '#FFDAD6', badgeBorder: '#BA1A1A', text: '#93000A' };
      default:        return { border: '#ccc', badge: '#f0f0f0', badgeBorder: '#ccc', text: '#666' };
    }
  };

  const renderStatusBadge = (status) => {
    let badgeClass = '';
    let iconSrc = null;
    switch (status) {
      case 'Success': badgeClass = 'status-badge badge-success'; iconSrc = successIcon; break;
      case 'Pending': badgeClass = 'status-badge badge-pending'; iconSrc = pendingIcon; break;
      case 'Failed':  badgeClass = 'status-badge badge-failed';  iconSrc = failedIcon;  break;
      default:        badgeClass = 'status-badge';
    }
    return (
      <span className={badgeClass}>
        {iconSrc && <img src={iconSrc} alt={status} className="status-icon" />}
        {status}
      </span>
    );
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!userData && !DEV_MODE) return (
    <div className="error-container">
      <h2>Error loading user data</h2>
      <button onClick={() => navigate('/signin')}>Go to Sign In</button>
    </div>
  );

  return (
    <div className='history-container'>

      {/* ── Sidebar ── */}
      <div className={`hist-side-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
  <button className="hist-mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
  <div className="hist-logo">
    <div className="hist-logo-image"><img src={dashboardLogo} alt="Logo"/></div>
  </div>
  <div className="hist-menu-items">
    <div className="hist-menu-item" onClick={handleDashboardClick}>
      <div className="hist-menu-icon"><img src={dashboardicon} alt="Dashboard"/></div>
      <span>Dashboard</span>
    </div>
    <div className="hist-menu-item" onClick={handleSubscriptionsClick}>
      <div className="hist-menu-icon"><img src={subscriptionicon} alt="Subscriptions"/></div>
      <span>Subscriptions</span>
    </div>
    <div className="hist-menu-item active" onClick={handleHistoryClick}>
      <div className="hist-menu-icon"><img src={historyicon} alt="History"/></div>
      <span>History</span>
      <div className="hist-active-indicator"></div>
    </div>
  </div>
  <div className="hist-bottom-menu-items">
    <div className="hist-menu-item" onClick={handleSupportClick}>
      <div className="hist-menu-icon"><img src={supporticon} alt="Support"/></div>
      <span>Support</span>
    </div>
    <div className="hist-menu-item" onClick={handleLogout}>
      <div className="hist-menu-icon"><img src={logouticon} alt="Logout"/></div>
      <span>Logout</span>
    </div>
  </div>
  <div className="hist-live-chat-container" onClick={handleLiveChatClick}>
    <div className="hist-live-chat-icon"><img src={livechatIcon} alt="Live chat"/></div>
    <span>Live chat</span>
  </div>
</div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className="hist-mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ── Main Content ── */}
      {userData && (
        <div className="history-content-container">

          {/* Top bar */}
          <div className="top-bar">
            <button className="hamburger-btn-history" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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

          {/* Page title */}
          <div className="transaction-title">
            <h1>Transaction History</h1>
            <p className="history-subtitle">Manage your subscriptions and top-up activities with the Sentinel's precision.</p>
          </div>

          {/* ── Tab Switcher — pill style on mobile, underline on desktop ── */}
          <div className="history-header">

            {/* Desktop tabs */}
            <div className="tab-navigation desktop-tabs">
              <div className={`tab ${activeTab === 'bundle' ? 'active' : ''}`} onClick={() => setActiveTab('bundle')}>
                <div className="tab-text">Bundle History</div>
                <div className="tab-indicator"></div>
              </div>
              <div className={`tab ${activeTab === 'topup' ? 'active' : ''}`} onClick={() => setActiveTab('topup')}>
                <div className="tab-text">Top Up History</div>
                <div className="tab-indicator"></div>
              </div>
            </div>

            {/* Mobile pill tab switcher */}
            <div className="mobile-tab-switcher">
              <div className="mobile-tab-bg">
                <button
                  className={`mobile-tab-btn ${activeTab === 'bundle' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bundle')}
                >
                  Bundle History
                </button>
                <button
                  className={`mobile-tab-btn ${activeTab === 'topup' ? 'active' : ''}`}
                  onClick={() => setActiveTab('topup')}
                >
                  Top Up History
                </button>
              </div>
            </div>

            <div className="period-selector">
              <div className="period-dropdown">
                <span>Filter</span>
                <div className="dropdown-icon"></div>
              </div>
            </div>
            <div className='active-selector'>
              <div className="active-status">
                <div className="status-dot-green"></div>
                <span>Active</span>
              </div>
            </div>
          </div>

          {/* ── DESKTOP TABLE ── */}
          {activeTab === 'bundle' && (
            <>
              <div className="history-table desktop-table">
                <div className="table-columns">
                  <div className="column status-column">
                    <div className="header-cell">Status</div>
                    {bundletransactions.map((t, i) => (
                      <div key={i} className="item-cell">{renderStatusBadge(t.status)}</div>
                    ))}
                  </div>
                  <div className="column bundle-column">
                    <div className="header-cell">Name of Bundle</div>
                    {bundletransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.bundleName}</div>
                    ))}
                  </div>
                  <div className="column date-column">
                    <div className="header-cell">Date</div>
                    {bundletransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.date}</div>
                    ))}
                  </div>
                  <div className="column amount-column">
                    <div className="header-cell">Amount</div>
                    {bundletransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.amount}</div>
                    ))}
                  </div>
                  <div className="column action-column">
                    <div className="header-cell">Action</div>
                    {bundletransactions.map((t, i) => (
                      <div key={i} className="item-cell">
                        <div className='action-cell-container'>
                          <button className="action-btn buy-btn" onClick={() => handleBuyClick(t)}>Buy</button>
                          <span className="view-more-text">View More</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── MOBILE CARDS ── */}
              <div className="mobile-transaction-cards">
                
                {bundletransactions.map((t, i) => {
                  const colors = getStatusColors(t.status);
                  return (
                    <div key={i} className="tx-card" style={{ borderLeft: `4px solid ${colors.border}` }}>
                      <div className="tx-card-top">
                        <div className="tx-card-left">
                          <span className="tx-card-label" style={{ color: colors.border }}>
                            IMBIL CLASSIC
                          </span>
                          <span className="tx-card-amount">{t.amount}</span>
                        </div>
                        <div
                          className="tx-card-badge"
                          style={{ background: colors.badge, border: `1px solid ${colors.badgeBorder}` }}
                        >
                          <span style={{ color: colors.text }}>{t.status}</span>
                        </div>
                      </div>
                      <div className="tx-card-divider" />
                      <div className="tx-card-bottom">
                        <span className="tx-card-date">📅 {t.date}</span>
                        <button className="tx-card-link" onClick={() => handleBuyClick(t)}>
                          View More →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pagination">
                <div className="pagination-content">
                  <div className="prev-btn"><span>Prev</span></div>
                  <div className="page-numbers">
                    <div className="page-num active">1</div>
                    <div className="page-num">2</div>
                    <div className="page-num">3</div>
                    <div className="page-dots">...</div>
                    <div className="page-num">8</div>
                  </div>
                  <div className="next-btn"><span>Next</span></div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'topup' && (
            <>
              <div className="history-table desktop-table">
                <div className="table-columns">
                  <div className="column status-column">
                    <div className="header-cell">Status</div>
                    {topuptransactions.map((t, i) => (
                      <div key={i} className="item-cell">{renderStatusBadge(t.status)}</div>
                    ))}
                  </div>
                  <div className="column bundle-column">
                    <div className="header-cell">Narration</div>
                    {topuptransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.narration}</div>
                    ))}
                  </div>
                  <div className="column date-column">
                    <div className="header-cell">Date</div>
                    {topuptransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.date}</div>
                    ))}
                  </div>
                  <div className="column amount-column">
                    <div className="header-cell">Description</div>
                    {topuptransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.description}</div>
                    ))}
                  </div>
                  <div className="column amount-column">
                    <div className="header-cell">Amount</div>
                    {topuptransactions.map((t, i) => (
                      <div key={i} className="item-cell">{t.amount}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── MOBILE CARDS ── */}
              <div className="mobile-transaction-cards">
                {topuptransactions.map((t, i) => {
                  const colors = getStatusColors(t.status);
                  return (
                    <div key={i} className="tx-card" style={{ borderLeft: `4px solid ${colors.border}` }}>
                      <div className="tx-card-top">
                        <div className="tx-card-left">
                          <span className="tx-card-label" style={{ color: colors.border }}>
                            {t.narration}
                          </span>
                          <span className="tx-card-amount">{t.amount}</span>
                        </div>
                        <div
                          className="tx-card-badge"
                          style={{ background: colors.badge, border: `1px solid ${colors.badgeBorder}` }}
                        >
                          <span style={{ color: colors.text }}>{t.status}</span>
                        </div>
                      </div>
                      <div className="tx-card-divider" />
                      <div className="tx-card-bottom">
                        <span className="tx-card-date">📅 {t.date}</span>
                        <span className="tx-card-link">{t.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pagination">
                <div className="pagination-content">
                  <div className="prev-btn"><span>Prev</span></div>
                  <div className="page-numbers">
                    <div className="page-num active">1</div>
                    <div className="page-num">2</div>
                    <div className="page-num">3</div>
                    <div className="page-dots">...</div>
                    <div className="page-num">8</div>
                  </div>
                  <div className="next-btn"><span>Next</span></div>
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default History;