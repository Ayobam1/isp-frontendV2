import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoWhite from '../assets/imbil-white.png'; 
import instagramIcon from '../assets/instaicon.png'; 
import facebookIcon from '../assets/fbicon.png';
import linkedinIcon from '../assets/linkedicon.png';
import './Footer.css';



const Footer = () => {
    return (
    <div className="footer">
        <div className="frame-123">
          {/* Company Info */}
          <div className="frame-156">
            <div className="frame-155">
              <div className="logo-white">
                <img src={logoWhite} alt="IMBIL Logo" />
              </div>
              <div className="frame-124">
                <p className="company-name">IMBIL Telecom Solutions</p>
              </div>
            </div>
            <p className="company-address">20, Adeshina St, off Obafemi Awolowo way, Ikeja, Nigeria</p>
          </div>
          </div>

         <div className='frame-125'>
          <div className='frame-124'>
            <h3 className='footer-heading'> COMPANY</h3>
             <div className='outline'></div>
          </div>
          <div className='frame-38'>
          <a href="/" className="footer-link">Home</a>
            <a href="/services" className="footer-link">Our Services</a>
            <a href="/plans" className="footer-link">Our Plans</a>
            <a href="/faq" className="footer-link">FAQ</a>
            <a href="/privacy" className="footer-link">Privacy and Policy</a>
          </div>
         </div>

       <div className='frame-161'>
        <div className='frame-127'>
       <div className='frame-126'>
       <h3 className='footer-heading'>
   CONTACT INFO 
       </h3>
       <div className='outline'></div>
       </div>
       <div className='frame-40'>
        <p className='contact-phone'> +234 2013 100100</p>
       </div>
        </div>
        <div className="social-icons">
            <a href="https://www.instagram.com/imbiltelecoms/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={instagramIcon} alt="Instagram" className="insta-icon" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61562745793728&name=xhp_nt__fb__action__open_user" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={facebookIcon} alt="Facebook" className="fb-icon" />
            </a>
            <a href="https://www.linkedin.com/company/imbil-consultancy-services/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
            </a>
          </div>
        </div>
       </div>

    );
    }
    
    export default Footer;