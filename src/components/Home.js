import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import OurPlans from './OurPlans';
import Header from './Header';
import Footer from './Footer';
import './Home.css';


const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

   
    const heroImages = [
      heroimage, 
      heroimage2, 
      heroimage3  
    ];
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
        <div className="check-availability">
        <div className="left-content">
            <div className="frame-6home">
            <img src={locationIcon} alt="Icon" className="location-iconhome" />
            </div>
        
          </div>

         <div className="middle-content">
  <div className="frame-210">
    <div className="location-label">LOCATION</div>
    <div className="frame-160">
      <div className="location-placeholder">Enter your Location</div>
      <img src={locationDropdown} alt="dropdown" className="locationdropdown-icon" />
    </div>
  </div>
  <div className="frame-213"></div>
  <div className="frame-233"></div>
</div>

          <div className="right-content">
            <button className="availability-button">Check Availability</button>
          </div>
        </div>
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

      <div className="our-plans-container section-spacer">
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
<div className="support-container section-spacer clearfix"> 

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
      <div className="faq-container section-spacer clearfix"> 
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
  
    </div>
   
    </main>
    <Footer />
    </div>
  );
}

export default Home;