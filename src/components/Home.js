import React, { useState, useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import heroimage from '../assets/heroimage1.png';
import heroimage2 from '../assets/heroimage2.png';
import heroimage3 from '../assets/heroimage3.png';
import locationIcon from '../assets/mdi_location.png';
import locationDropdown from '../assets/locationvector.png';
import serviceimage from '../assets/handsome-black-manager-having-video-interview-with-employee(1).png';
import smartHomeIcon from '../assets/Smart home.png';
import companyIcon from '../assets/Company.png';
import realEstateIcon from '../assets/Real Estate.png';
import plansIcon from '../assets/transparentplans.png';
import networkIcon from '../assets/networkuptime.png';
import businessIcon from '../assets/baselinebusiness.png';
import supportIcon from '../assets/customersupport.png';
import coverageIcon from '../assets/nationwide.png';
import setupIcon from '../assets/installation.png';
import speed from '../assets/internetspeed.png';
import contactSupport from '../assets/Contactsupportagent.png';
import OurPlans from './OurPlans';
import Header from './Header';
import Footer from './Footer';
import { createSupportTicket } from '../api/authService';
import * as turf from '@turf/turf';
import './Home.css';

const fiberZones = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3.3626802, 6.6219016],
            [3.331557, 6.606374],
            [3.341858, 6.5885071],
            [3.3636948, 6.5898596],
            [3.3754378, 6.6051903],
            [3.3708114, 6.6110393],
            [3.3626802, 6.6219016],
          ],
        ],
      },
    },
  ],
};

const Home = () => {
     const [currentSlide, setCurrentSlide] = useState(0);
     const navigate = useNavigate();
     const [query, setQuery] = useState('');
     const [suggestions, setSuggestions] = useState([]);
     const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
     const [hasSearchedSuggestions, setHasSearchedSuggestions] = useState(false);
     const [selectedPlace, setSelectedPlace] = useState(null);
     const [result, setResult] = useState(null);
     const [isChecking, setIsChecking] = useState(false);
   
     const debounceTimer = useRef(null);
     const wrapperRef = useRef(null);
     const [contactForm, setContactForm] = useState({ fullName: '', email: '', message: '' });
     const [contactSubmitting, setContactSubmitting] = useState(false);
     const [contactSubmitted, setContactSubmitted] = useState(false);
     const [contactError, setContactError] = useState(null); // ← new



  // Close dropdown when clicking outside the widget
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);


const fetchSuggestions = async (searchQuery) => {
  setIsFetchingSuggestions(true);
  try {
    const q = encodeURIComponent(searchQuery + ', Nigeria');
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5&addressdetails=1`
    );
    const data = await res.json();
    setSuggestions(data);
  } catch (err) {
    console.error('Error fetching suggestions:', err);
    setSuggestions([]);
  } finally {
    setIsFetchingSuggestions(false);
    setHasSearchedSuggestions(true);
  }
};

 const handleInputChange = (e) => {
  const value = e.target.value;
  setQuery(value);
  setSelectedPlace(null);
  setResult(null);
  setHasSearchedSuggestions(false); // ← reset on every keystroke

  clearTimeout(debounceTimer.current);

  if (value.trim().length < 3) {
    setSuggestions([]);
    return;
  }

  debounceTimer.current = setTimeout(() => fetchSuggestions(value.trim()), 400);
};

const handleSelectPlace = (place) => {
  setQuery(place.display_name);
  setSelectedPlace(place);
  setSuggestions([]);
  setHasSearchedSuggestions(false); // ← add this
};

const checkZone = (userLat, userLng) => {
  const userPoint = turf.point([userLng, userLat]);
  const matchedZone = fiberZones.features.find((zone) =>
    turf.booleanPointInPolygon(userPoint, zone)
  );

  if (matchedZone) {
    setResult({ available: true, message: 'We are available in your area!' });
  } else {
    setResult({ available: false, message: 'We are not available yet in your location.' });
  }
};

  const handleCheckAvailability = () => {
    if (!selectedPlace) {
      setResult({ available: false, message: 'Please select an address from the suggestions.' });
      return;
    }

    setIsChecking(true);
    checkZone(parseFloat(selectedPlace.lat), parseFloat(selectedPlace.lon));
    setIsChecking(false);
  };



     const handleNavigation = (path) => {
    // setMenuOpen(false);
    navigate(path);
  };


   const [menuOpen, setMenuOpen] = useState(false);
    const heroImages = [
      heroimage, 
      heroimage2, 
      heroimage3  
    ];

    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
        }, 5000);
        
        return () => clearInterval(interval);
      }, [heroImages.length]);
      

   
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
      }, 5000);
      
      return () => clearInterval(interval);
    }, [heroImages.length]);
    

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
    const [openFaqs, setOpenFaqs] = React.useState({});

useEffect(() => {
  const sectionId = location.state?.scrollTo;

  if (!sectionId) return;

  // Give React time to render the Home page
  const timer = setTimeout(() => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, 100);

  return () => clearTimeout(timer);
}, [location]);

const handleSectionNav = (sectionId) => {
  setMenuOpen(false);

  if (window.location.pathname === '/home') {
    // Already on Home — scroll directly
    const el = document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Navigate to Home and tell it which section to scroll to
    navigate('/home', {
      state: {
        scrollTo: sectionId,
      },
    });
  }
};

    const toggleFaq = (index) => {
        setOpenFaqs(prevState => ({
          ...prevState,
          [index]: !prevState[index]
        }));
      };
      const styles = `
      /* Fix for the plus/minus icon */
      .ic-round-plus {
        width: 24px;
        height: 24px;
        position: relative;
        display: inline-block;
        flex: none;
        order: 1;
        flex-grow: 0;
        margin: 0;
        transition: transform 0.3s ease;
      }
      
      .ic-round-plus::before,
      .ic-round-plus::after {
        content: "";
        position: absolute;
        background-color: #F24822;
        transition: all 0.3s ease;
      }
      
      .ic-round-plus::before {
        width: 16px;
        height: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .ic-round-plus::after {
        width: 2px;
        height: 16px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      /* This is the key class to turn plus into minus */
      .ic-round-plus.is-open::after {
        opacity: 0;
      }
    `;
   const faqItems = [
    {
      question: "Q:What is Imbil Connect?",
      answer: "Imbil Connect is a premium internet service provider offering truly unlimited, high-speed broadband with no fair usage policy (FUP)—meaning no data caps or speed throttling."
    },
    {
        question: "Q:What makes Imbil Connect different from other ISPs?",
        answer: "Unlike many competitors, Imbil Connect provides:\n\n✅ Truly unlimited data – No FUP, no speed reductions.\n\n✅ Reliable, high-speed internet for smooth streaming, gaming, and business use.\n\n✅ Flexible pricing plans** to suit homes and businesses.\n\n✅ Top-notch customer support, including 24/7 priority service for premium plans."
      },
    {
      question: "Q:Where is Imbil Connect un-available?",
      answer: "We currently offer coverage in major cities, including Lagos, Abuja, and Port Harcourt, with ongoing expansion plans."
    },
    {
      question: "Q:What internet plans does Imbil Connect offer?",
      answer: "* **Basic (₦25,000, 5 Mbps)** – Affordable, reliable internet for light users\n* **Classic (₦35,000, 8 Mbps)** – Great for households and remote work\n* **Standard (₦45,000, 15 Mbps)** – Ideal for multiple devices and medium usage\n* **Premium (₦60,000, 30 Mbps)** – For families and businesses needing fast, stable connections\n* **Supreme (₦78,500, 50 Mbps)** – Perfect for gamers and streamers\n* **Platinum (₦90,800, 100 Mbps)** – Maximum speed with business-grade support"
    },
    {
      question: "Q:Are there any hidden fees?",
      answer: "No! Our pricing is transparent, with no extra charges for exceeding data limits—because there are no limits!"
    },
    {
      question: "Q:Do I need to sign a contract?",
      answer: "No long-term contracts are required. You can renew or upgrade your plan monthly as needed."
    }
  ];

  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const testimonials = [
    {
      rating: 5,
      text: "I've not been using their fiber-optic service for months, and it's been amazing! Super-fast speeds, no buffering, and I can stream everything in HD without any issues."
    },
    {
      rating: 5,
      text: "Absolutely love the reliability of my new fiber-optic connection. Whether I'm working from home or streaming movies, the speed is always consistent!"
    },
    {
      rating: 5,
      text: "The customer service is exceptional. Had an issue with my connection, and they resolved it within hours. Been with them for 6 months now, and couldn't be happier!"
    },
    {
      rating: 5,
      text: "As a remote worker, reliable internet is crucial. Since switching to fiber-optic, video meetings are crystal clear and I never worry about disconnecting during important calls."
    },
    {
      rating: 5,
      text: "My family of five all streams and games simultaneously without any lag. The unlimited data plan means we never have to worry about overage charges."
    },
    {
      rating: 5,
      text: "Installation was quick and professional. The technician explained everything clearly and even helped me set up my home network for optimal performance."
    },
    {
      rating: 5,
      text: "I was skeptical about claims of 'unlimited' data, but they truly deliver. I've downloaded hundreds of gigabytes without any slowdown or extra charges."
    },
    {
      rating: 5,
      text: "The stability is what impressed me most. Even during heavy storms, our connection remains solid while neighbors with other providers experience outages."
    }
  ];


const goToTestimonialSlide = (index) => {
    setCurrentTestimonialSlide(index);
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialSlide(prev => 
        prev === Math.ceil(testimonials.length / 2) - 1 ? 0 : prev + 1
      );
    }, 6000); 
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const totalSlides = Math.ceil(testimonials.length / 2);

const handleContactChange = (e) => {
  const { name, value } = e.target;
  setContactForm((prev) => ({ ...prev, [name]: value }));
};

const handleContactSubmit = async (e) => {
  e.preventDefault();
  setContactSubmitting(true);
  setContactError(null);

  try {
    await createSupportTicket({
      name: contactForm.fullName,
      email: contactForm.email,
      message: contactForm.message,
    });

    setContactSubmitted(true);
    setContactForm({ fullName: '', email: '', message: '' });
  } catch (err) {
    console.error('Contact form submission failed:', err);
    setContactError(
      err.response?.data?.message || 'Something went wrong — please try again.'
    );
  } finally {
    setContactSubmitting(false);
  }
};

  return (
    <div className="page-container">
   <Header/>
  <main> 
    <div className='home-container'>
      <div className="hero-container section-spacer">  
    <div className="hero-container">
  {/* Images */}
  {heroImages.map((image, index) => (
    <img 
      key={index}
      src={image}
      alt={`Hero ${index + 1}`}
      className="hero-image"
      style={{
        opacity: index === currentSlide ? 1 : 0,
        position: index === currentSlide ? 'relative' : 'absolute',
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  ))}

  {/* Get Started Button - mobile only */}
  <button className="hero-get-started-btn" onClick={() => handleNavigation('/started')}>
    Get Started
  </button>

  {/* Navigation Dots */}
  <div className="slider-dots">
    {heroImages.map((_, index) => (
      <div 
        key={index}
        className={`dot ${index === currentSlide ? 'active' : ''}`}
        onClick={() => goToSlide(index)}
      />
    ))}
  </div>
</div>
</div> 

 <div className="check-availability-wrapper section-spacer">
      <div className="check-availability" ref={wrapperRef}>
        <div className="left-content">
          <div className="frame-6home">
            <img src={locationIcon} alt="Icon" className="location-iconhome" />
          </div>
        </div>

        <div className="middle-content">
          <div className="frame-210">
            <div className="location-label-row">
              <div className="frame-6home">
                <img src={locationIcon} alt="Icon" className="location-iconhome" />
              </div>
              <div className="location-label">LOCATION</div>
            </div>

            <div className="frame-160">
              <input
                type="text"
                className="location-placeholder-input"
                placeholder="Enter your Location"
                value={query}
                onChange={handleInputChange}
              />
              {/* <img src={locationDropdown} alt="dropdown" className="locationdropdown-icon" /> */}
            </div>

         {suggestions.length > 0 && (
  <ul className="location-suggestions">
    {suggestions.map((place) => (
      <li key={place.place_id} onClick={() => handleSelectPlace(place)}>
        {place.display_name}
      </li>
    ))}
  </ul>
)}

{isFetchingSuggestions && (
  <div className="location-suggestions-status">Searching…</div>
)}

{!isFetchingSuggestions &&
  hasSearchedSuggestions &&
  suggestions.length === 0 &&
  query.trim().length >= 3 && (
    <div className="location-suggestions-status">
      No matching address found — try a different search.
    </div>
  )}
          </div>
        </div>

        <div className="right-content">
          <button
            className="availability-button"
            onClick={handleCheckAvailability}
            disabled={isChecking}
          >
            {isChecking ? 'Checking...' : 'Check Availability'}
          </button>
        </div>
      </div>

      {result && (
        <div className={`availability-result ${result.available ? 'success' : 'waitlist'}`}>
          {result.message}
          {result.available && <a href="/signup"> Click Get Started to sign up</a>}
        </div>
      )}
    </div>


      <div className="service-container section-spacer clearfix"> 
      <div className="service-container">
      <div className="service-image-container">
          <img src={serviceimage} alt="Our Services" className="service-image" />
        </div>

        <div className="frame-14">
          <div className="frame-9">
            <h2 className="our-offerings">Our Offerings</h2>
          </div>
          
          <div className="frame-11">
            <div className="smart-home-icon">
              <img src={smartHomeIcon} alt="Smart Home" />
            </div>
            <div className="frame-10">
              <h3 className="residential">Residential</h3>
              <p className="residential-desc">connecting your home to the future!</p>
            </div>
          </div>
          
          <div className="frame-13">
            <div className="company-icon">
              <img src={companyIcon} alt="Company" />
            </div>
            <div className="frame-10">
              <h3 className="enterprises">Enterprises</h3>
              <p className="enterprises-desc">faster, secure, and scalable for your business needs.</p>
            </div>
          </div>
          
          <div className="frame-12">
            <div className="real-estate-icon">
              <img src={realEstateIcon} alt="Real Estate" />
            </div>
            <div className="frame-10">
              <h3 className="office">Office</h3>
              <p className="office-desc">Reliable, high-speed Fiber Optics for your office</p>
            </div>
          </div>
         </div>
      </div>
      </div>

      <div className="why-choose-us-container section-spacer clearfix"> 
            
            <div className="why-choose-us-container">
        <div className="frame-158">
            <h2 className="why-choose-us-heading">Why Choose us?</h2>
        </div>
        
        {/* Background dots */}
        <div className="group-10">
          <div className="rectangle-2"></div>
          <div className="rectangle-3"></div>
          <div className="rectangle-4"></div>
          <div className="rectangle-5"></div>
          <div className="rectangle-6"></div>
          <div className="rectangle-7"></div>
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
          <div className="rectangle-10"></div>
          <div className="rectangle-11"></div>
          <div className="rectangle-12"></div>
          <div className="rectangle-13"></div>
          <div className="rectangle-14"></div>
          <div className="rectangle-15"></div>
          <div className="rectangle-16"></div>
          <div className="rectangle-17"></div>
          <div className="rectangle-18"></div>
          <div className="rectangle-19"></div>
          <div className="rectangle-20"></div>
          <div className="rectangle-21"></div>
        </div>
        
        {/* First row of features */}
        <div className="frame-29">
          <div className="feature-box">
            <div className="feature-icon-container">
              <img src={speed} alt="Internet" className="feature-icon" />
            </div>
            <h3 className="feature-title">Unmatched Internet Speed</h3>
            <p className='feature-subtitle'>Enjoy Lightning-Fast Connectivity That Powers Everything From Remote Work To Online Gaming Without Lag.</p>
          </div>
          
          <div className="feature-box">
            <div className="feature-icon-container">
              <img src={networkIcon} alt="Big Data" className="feature-icon" />
            </div>
            <h3 className="feature-title">99.9% Network Uptime</h3>
            <p className='feature-subtitle'>Stay Connected When It Matters Most—with Enterprise-Grade Reliability For Homes and Businesses.</p>
          </div>
        </div>
        
        {/* Second row of features */}
        <div className="frame-30">
         <div className="feature-box">
            <div className="feature-icon-container">
              <img src={plansIcon} alt="Support" className="feature-icon" />
            </div>
            <h3 className="feature-title">Simple, Transparent Plans</h3>
            <p className='feature-subtitle'>No Hidden Fees, No Confusing Bundles. Just Flexible Packages That Suit Your Needs.</p>
          </div>
          
          <div className="feature-box">
            <div className="feature-icon-container">
              <img src={supportIcon} alt="Support" className="feature-icon" />
            </div>
            <h3 className="feature-title">Exceptional Customer Support</h3>
            <p className='feature-subtitle'>Real People. Real Solutions. Our Support Team is Available 24/7 To Help You Anytime.</p>
          </div>
        </div>
        <div className="frame-31">
          <div className="feature-box">
            <div className="feature-icon-container">
              <img src={businessIcon} alt="Performance" className="feature-icon" />
            </div>
            <h3 className="feature-title">Built For Businesses</h3>
            <p className='feature-subtitle'>Scalable Solutions,Dedicated Bandwidth, And Prioritized Support For Commercial Users.</p>
          </div>
          
          <div className="feature-box">
            <div className="feature-icon-container">
              <img src={setupIcon} alt="Support" className="feature-icon" />
            </div>
            <h3 className="feature-title">Easy Setup & Installation</h3>
            <p className='feature-subtitle'>Quick Installation And Instant Activation – Get Online Fast Without The Hassle.</p>
          </div>
        </div>
        
        <div className="frame-32">
          <div className="feature-frame32">
            <div className="feature-icon-container">
              <img src={coverageIcon} alt="Performance" className="feature-icon" />
            </div>
            <h3 className="feature-title">Nationwide Coverage</h3>
            <p className='feature-subtitle'>Expanding Across Nigeria With Strong, Stable Connections Wherever You Are</p>
          </div>
          
        </div>

      </div>
      </div>

<div className="our-plans-container" id = "our-plans">
  <OurPlans />
</div>

      <div className="customer-stories-container">
  <div className="customer-stories-bg"></div>
  <h2 className="customer-stories-title">Customer Stories</h2>
  
  <div className="frame-65" style={{ transition: 'opacity 0.5s ease' }}>
    {testimonials.slice(currentTestimonialSlide * 2, currentTestimonialSlide * 2 + 2).map((testimonial, index) => (
      <div className="testimonial-card" key={currentTestimonialSlide * 2 + index}>
        <div className="testimonial-info">
          <div className="text">
            <div className="star-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <div className="star-icon" key={i}><div className="star-vector"></div></div>
              ))}
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  <div className="page-control">
    <div className="frame">
      <div className="platter">
        <div className="ultrathin"></div>
      </div>
      
      {[...Array(totalSlides)].map((_, index) => (
        <div 
          key={index}
          className={`${index === 0 ? 'dot-1' : 'dot-2'} ${currentTestimonialSlide === index ? 'active-dot' : ''}`}
          onClick={() => goToTestimonialSlide(index)}
          style={{ 
            cursor: 'pointer',
            opacity: currentTestimonialSlide === index ? 1 : 0.3,
            transition: 'all 0.3s ease'
          }}
        ></div>
      ))}
    </div>
  </div>
</div>


{/* Support Container */}
<div className="support-container section-spacer clearfix" id="contact-us"> 

  <div className="support-image"></div>
  
  <div className="frame-14-support">
    <div className="frame-14-row">
      <h2 className="connect-title">Connect with Us</h2>
    </div>
    
    <div className="frame-11-support">
      <div className="office-phone-icon"></div>
      <div className="frame-10-support">
        <h3 className="contact-type">Phone</h3>
        <p className="contact-detail">+234 2013 100100</p>
      </div>
    </div>
    
    <div className="frame-13-support">
      <div className="support-mail-icon"></div>
      <div className="frame-10-support">
        <h3 className="contact-type">Email</h3>
        <p className="contact-detail">Info@imbil.co.uk</p>
        <p className="contact-detail">Info@imbiltelecom.com</p>
      </div>
    </div>
  </div>
  
  <div className="frame160">
    <h3 className="social-media-title">Social Media</h3>
    <div className="group-11">
      <div className="facebook-icon"></div>
      <div className="linkedinsupport-icon"></div>
      <div className="instagram-icon"></div>
    </div>
  </div>

</div>
      
      {/* FAQ Container */}
      <div className="faq-container section-spacer clearfix" id="faq"> 
      <div className="faq-container">
        <div className="faq-image"></div>
        <div className="frame-206">
          <div className="frame-9-faq">
            <h2 className="faq-title">Frequently Asked Question ?</h2>
          </div>
          
          <div className="frame-204">
            {faqItems.map((item, index) => (
              <div className="faq-desktop" key={index}>
                <div
                  className="faq-desktop-1"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-question">{item.question}</span>
                 
                  <div className={`ic-round-plus ${openFaqs[index] ? 'is-open' : ''}`}>
                    <div className="plus-vector"></div>
                  </div>
                </div>
                
              
                {openFaqs[index] && (
                  <div className="faq-desktop-2">
                    <p className="faq-answer">
                      {item.answer.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line.startsWith('* **') ? (
                            <div style={{ marginBottom: '8px' }}>
                              <span style={{ fontWeight: 'bold' }}>
                                {line.substring(line.indexOf('**') + 2, line.lastIndexOf('**'))}
                              </span>
                              {line.substring(line.lastIndexOf('**') + 2)}
                            </div>
                          ) : (
                            line
                          )}
                          {i < item.answer.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>


            {/* Contact Us - directly under FAQ */}
      <div className="contact-us-container section-spacer clearfix" id="contact-us-002">
        <div className="contact-us-image-wrapper">
          <img src={contactSupport} alt="Support agent" className="contact-us-image" />
        </div>

        <div className="contact-us-form-wrapper">
          <h2 className="contact-us-heading">
            Have Questions?<br />We're Here To Help.
          </h2>

          <form className="contact-us-form" onSubmit={handleContactSubmit}>
            <div className="contact-us-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={contactForm.fullName}
                onChange={handleContactChange}
                required
              />
            </div>

            <div className="contact-us-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
            </div>

            <div className="contact-us-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={contactForm.message}
                onChange={handleContactChange}
                required
              />
            </div>

            {contactSubmitted && (
              <p className="contact-us-success">Thanks — we'll get back to you shortly.</p>
            )}

            <button type="submit" className="contact-us-submit" disabled={contactSubmitting}>
              {contactSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
  
    </div>
   
    </main>
    <Footer />
    </div>
  );
}

export default Home;


