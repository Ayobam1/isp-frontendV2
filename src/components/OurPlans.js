import React from 'react';
import './Home.css';
import backgroundImg from '../assets/backgroundimage.png'; 
import tvIcon from '../assets/TV Show 2.png'; 
import smartphoneIcon from '../assets/Smartphone 2.png';
import laptopIcon from '../assets/Laptop 2.png';
import checkIcon from '../assets/planVector.png';


const OurPlans = () => {
 
  const DataPlan = ({ title, features, speed, price }) => {
   
   const featureList = features.split(/\.\s+|\.$/).filter(feature => feature.trim() !== '');


    return (
      <div className="data-plan">
        <div className="frame-21"></div>
        <div className="frame-20">
          <div className="frame-18">
            {/* <div className="rectangle-42"></div> */}
            <div className="frame-157">
              <h3 className="plan-title">{title}</h3>
              <div className="frame-23">
                <h4 className="plan-subtitle">Unlimited Data for 30days</h4>
                
                {/* Updated features section with check icons */}
                <div className="plan-features-list">
            {featureList.map((item, i) => (
              <div key={i} className="feature-item">
                <img src={checkIcon} alt="check" className="check-icon" />
                 <span>{item}</span>
              </div>
            ))}
          </div>
                
                <p className="plan-speed">{speed}</p>
              </div>
            </div>
          </div>

          <div className="frame-17">
            {/* <div className="rectangle-42"></div> */}
            <div className="gadget">
              
             <div className="icon-frame">
             <div className="tv-show">
             <img src={tvIcon} alt="TV" />
             </div>
             </div>
              <span className="plus">+</span>
              <div className="icon-frame2">
              <div className="smartphone">
                <img src={smartphoneIcon} alt="Smartphone" />
              </div>
              </div>
              <span className="plus">+</span>
              <div className="icon-frame3"> 
              <div className="laptop">
                <img src={laptopIcon} alt="Laptop" />
              </div>
              </div>
            </div>
          </div>

          <div className="frame-19">
            <p className="price">{price}</p>
            <button className="buy-button">Buy</button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="our-plans-container">
      <div className="background-image"></div>
      
      <div className="frame-216">
        <DataPlan 
          title="IMBIL Connect Basic" 
          features="Basic Phone Line Service(Complimentary DDI Line). Basic 12-Hour Tech Support. Free Installation. Complimentary Router & Network Setup" 
          speed="5 Mbps (No FUP)" 
          price="N25,000 per Month" 
        />
        
        <DataPlan 
          title="IMBIL Connect Classic" 
          features="Bundled DDI Line. Priority Support For Multi-Device Access. Includes All Imbil Connect Basic Services" 
          speed="8 Mbps (No FUP)" 
          price="N35,000 per Month" 
        />
        
        <DataPlan 
          title="IMBIL Connect Standard" 
          features="Combines All Imbil Connect Basic and Classic Services. Priority 24/7 Customer Support" 
          speed="15 Mbps (No FUP)" 
          price="N45,000 per Month" 
        />
        
        <DataPlan 
          title="IMBIL Connect Premium" 
          features="Priority 24/7 Customer Support. Additional PNL/DDI Lines Option. Free Installation" 
          speed="30 Mbps (No FUP)" 
          price="N60,000 per Month" 
        />
      </div>
      
    </div>
  );
};

export default OurPlans;