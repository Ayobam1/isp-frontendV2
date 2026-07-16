import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OurPlans.css';
import tvIcon from '../assets/TV Show 2.png';
import smartphoneIcon from '../assets/Smartphone 2.png';
import laptopIcon from '../assets/Laptop 2.png';
import checkIcon from '../assets/planVector.png';


const plans = [
  {
    title: 'IMBIL Connect Basic',
    features: [
      'Basic Phone Line Service (Complimentary DDI Line)',
      'Basic 12-Hour Tech Support',
      'Free Installation',
      'Complimentary Router & Network Setup',
    ],
    speed: '5 Mbps (No FUP)',
    price: 'N25,000 per Month',
  },
  {
    title: 'IMBIL Connect Classic',
    features: [
      'Bundled DDI Line',
      'Priority Support For Multi-Device Access',
      'Includes All Imbil Connect Basic Services',
    ],
    speed: '8 Mbps (No FUP)',
    price: 'N35,000 per Month',
  },
  {
    title: 'IMBIL Connect Standard',
    features: [
      'Combines All Imbil Connect Basic and Classic Services',
      'Priority 24/7 Customer Support',
    ],
    speed: '15 Mbps (No FUP)',
    price: 'N45,000 per Month',
  },
  {
    title: 'IMBIL Connect Premium',
    features: [
      'Priority 24/7 Customer Support',
      'Additional PNL/DDI Lines Option',
      'Free Installation',
    ],
    speed: '30 Mbps (No FUP)',
    price: 'N60,000 per Month',
  },
];

const OurPlans = () => {

     const navigate = useNavigate();
      const [menuOpen, setMenuOpen] = useState(false);
  
      const handleNavigation = (path) => {
          setMenuOpen(false); 
          navigate(path);
      };
      
  return (
    <div className="our-plans-wrapper">
      <div className="plans-list">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>

            {/* Top blue bar */}
            <div className="plan-card-top-bar" />

            {/* Card body — 3 columns via grid */}
            <div className="plan-card-body">

              {/* Column 1: Info */}
              <div className="plan-card-info">
                <h3 className="plan-card-title">{plan.title}</h3>
                <h4 className="plan-card-subtitle">Unlimited Data for 30days</h4>
                <div className="plan-features">
                  {plan.features.map((feature, i) => (
                    <div className="plan-feature-row" key={i}>
                      <img src={checkIcon} alt="check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <p className="plan-speed">{plan.speed}</p>
              </div>

              {/* Column 2: Icons */}
              <div className="plan-card-icons">
                <div className="plan-icons-row">
                  <img src={tvIcon} alt="TV" />
                  <span>+</span>
                  <img src={smartphoneIcon} alt="Smartphone" />
                  <span>+</span>
                  <img src={laptopIcon} alt="Laptop" />
                </div>
              </div>

              {/* Column 3: Price */}
              <div className="plan-card-price">
                <p className="plan-price-text">{plan.price}</p>
                <button className="plan-buy-btn"
                onClick={() => handleNavigation('/started')}
                >Buy
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPlans;