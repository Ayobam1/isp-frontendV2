import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import livechatIcon from '../assets/chat.png';
import dashboardLogo from '../assets/dashboard.png';
import dashboardicon from '../assets/grid-4.png';
import subscriptionicon from '../assets/Wifi.png';
import historyicon from '../assets/Trending-down.png';
import userheaderIcon from '../assets/userheader.png';
import callSupport from '../assets/call support.png';
import supportagent from '../assets/supportagent.png';
import supporticon from '../assets/support.png';
import sectionicon from '../assets/sectionicon.png';
import chathistory from '../assets/chathistory.png';
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
const faqs = [
  { id: 1, question: "What is Imbil Connect?" },
  { id: 2, question: "Are There Any Hidden Fees?" },
  { id: 3, question: "How do I Get Imbil Connect Installed?" },
  { id: 4, question: "Can I Upgrade or Downgrade My Plan?" },
  { id: 5, question: "My Internet is Slow. What Should I Do?" },
 
];
 
const faqAnswers = {
  1: "Imbil Connect is a premium internet service provider offering truly unlimited, high-speed broadband with no fair usage policy (FUP)—meaning no data caps or speed throttling.",
  2: "No! Our pricing is transparent, with no extra charges for exceeding data limits—because there are no limits!",
  3: "You can update your account information by navigating to your profile settings and editing the relevant fields.",
  4: "Imbil Connect accepts major credit/debit cards, bank transfers, and various mobile payment options.",
  5: "You can contact customer support via the live chat widget on this page, email, or phone number listed in your account dashboard.",
};


  const [openFaq, setOpenFaq] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
 
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);
 
  const sendMessage = () => {
    if (!message.trim()) return;
    const userMsg = { from: "user", text: message };
    setChatMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setChatStarted(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          from: "agent",
          text: "Thanks for reaching out! A support agent will be with you shortly.",
        },
      ]);
    }, 900);
  };

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
         <div className="sp-page">
        <div className="sp-card">
 
          {/* ── User Header ── */}
          <div className="sp-user-header">
            <div className="sp-user-left">
              <button className="sp-back-btn" aria-label="Go back">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M10 12L6 8l4-4" stroke="#191C1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
 
              <div className="sp-avatar-wrap">
                <div className="sp-avatar">TO</div>
                <div className="sp-avatar-online" />
              </div>
 
             <div className="sp-user-info">
             <span className="sp-user-name">Taofeek Olaojo</span>
             <div className="sp-user-meta">
    <span className="sp-user-role">
      <img 
        src={userheaderIcon} 
        alt="user" 
        width="12" 
        height="12" 
        style={{ objectFit: 'contain' }}
      />
      Last seen: 12 minutes ago
    </span>
    <span className="sp-badge">ID: NEX-8829-S</span>
  </div>
</div>
            </div>
 
           <button className="sp-message-btn">
  <img 
    src={callSupport} 
    alt="call support" 
    width="18" 
    height="18" 
    style={{ objectFit: 'contain' }}
  />
  Support Call
</button>
          </div>
 
          {/* ── Personal Info Bar ── */}
          <div className="sp-info-bar">
            <div className="sp-info-col">
              <span className="sp-info-label">Email Address</span>
              <span className="sp-info-value">t.mateen@gmail.com</span>
            </div>
            <div className="sp-info-col">
              <span className="sp-info-label">Phone Number</span>
              <span className="sp-info-value">+234 816 575 2232</span>
            </div>
            <div className="sp-info-col">
              <span className="sp-info-label">Address</span>
              <span className="sp-info-value">20, Adeshina St, Ikeja, Lagos</span>
            </div>
            <div className="sp-info-col">
              <span className="sp-info-label">Account Type</span>
             <div className="sp-account-type">
  <img 
    src={sectionicon} 
    alt="section icon" 
    width="10" 
    height="13" 
    style={{ objectFit: 'contain' }}
  />
  USER
</div>
            </div>
          </div>
 
          {/* ── Bottom: FAQ + Chat ── */}
          <div className="sp-bottom">
 
            {/* FAQ */}
            <div className="sp-faq-section">
              <div className="sp-faq-header">
                <span className="sp-faq-title">Frequently Asked Questions</span>
                <button className="sp-view-all-btn">View All</button>
              </div>
 
              <div className="sp-faq-list">
                {faqs.map((faq) => (
                  <div className="sp-faq-item" key={faq.id}>
                    <button
                      className="sp-faq-question"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={openFaq === faq.id}
                    >
                      <span className="sp-faq-question-text">{faq.question}</span>
                      <span className={`sp-faq-icon${openFaq === faq.id ? " open" : ""}`}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path d="M12 5v14M5 12h14" stroke="#F24822" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </button>
                    <div className={`sp-faq-answer${openFaq === faq.id ? " open" : ""}`}>
                      {faqAnswers[faq.id]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Chat Widget */}
            <div className="sp-chat-section">
              {/* Header */}
              <div className="sp-chat-header">
                <div className="sp-chat-agent">
                  <div className="sp-agent-avatar-wrap">
                    <div className="sp-agent-avatar">
                                           <img 
    src={supportagent} 
    alt="suport agent" 
    width="22" 
    height="19" 
    style={{ objectFit: 'contain' }}
  />
                    </div>
                    <div className="sp-agent-online" />
                  </div>
                  <div>
                    <div className="sp-agent-name">IMBIL Support Agent</div>
                    <div className="sp-agent-status">Online</div>
                  </div>
                </div>
                <div className="sp-chat-actions">
                  <button className="sp-chat-action-btn" aria-label="Search">
                    <img 
        src={userheaderIcon} 
        alt="user" 
        width="12" 
        height="12" 
        style={{ objectFit: 'contain' }}
      />
                  </button>
                  <button className="sp-chat-action-btn" aria-label="More options">
                    <svg width="4" height="14" fill="none" viewBox="0 0 4 14">
                      <circle cx="2" cy="2" r="1.5" fill="#64748B"/>
                      <circle cx="2" cy="7" r="1.5" fill="#64748B"/>
                      <circle cx="2" cy="12" r="1.5" fill="#64748B"/>
                    </svg>
                  </button>
                </div>
              </div>
 
              {/* Chat History */}
              <div className="sp-chat-history">
                {!chatStarted ? (
                  <div className="sp-chat-empty">
                    <div className="sp-chat-empty-icon">
                       <img 
    src={chathistory} 
    alt="chat history" 
    width="33" 
    height="28.5" 
    style={{ objectFit: 'contain' }}
  />
                    </div>
                    <div className="sp-chat-empty-title">No Messages Yet</div>
                    <div className="sp-chat-empty-desc">
                      Start a conversation with our support agent. We typically reply within a few minutes.
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className={`sp-bubble-row ${msg.from}`}>
                      <div className={`sp-bubble ${msg.from}`}>{msg.text}</div>
                    </div>
                  ))
                )}
              </div>
 
              {/* Input */}
              <div className="sp-chat-input-area">
                <div className="sp-chat-input-row">
                  <button className="sp-attach-btn" aria-label="Attach file">
                    <svg width="13" height="20" fill="none" viewBox="0 0 13 20">
                      <path d="M11.5 5v9a5 5 0 0 1-10 0V4a3 3 0 1 1 6 0v9a1 1 0 1 1-2 0V5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="sp-input-wrap">
                    <input
                      className="sp-input"
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                    />
                    <button className="sp-send-btn" onClick={sendMessage} aria-label="Send">
                      <svg width="19" height="16" fill="none" viewBox="0 0 19 16">
                        <path d="M1 8h17M10 1l8 7-8 7" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <button className="sp-mic-btn" aria-label="Voice message">
                    <svg width="14" height="19" fill="none" viewBox="0 0 14 19">
                      <rect x="4" y="1" width="6" height="10" rx="3" stroke="#94A3B8" strokeWidth="1.5"/>
                      <path d="M1 9a6 6 0 0 0 12 0M7 15v3" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
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