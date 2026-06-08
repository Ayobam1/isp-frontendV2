import React,{useState, useRef, useEffect} from 'react';
import axios from 'axios';
import './getStarted.css';
import SuccessPopup from './SuccessPopup';
import nameIcon from '../assets/peopleVector.png';
import emailIcon from '../assets/startedemail.png';
import numberIcon from '../assets/startedcall.png';
import residenceIcon from '../assets/residence.png';
import expandArrow from '../assets/Expand Arrow.png';
import { useNavigate } from 'react-router-dom';
import { createRequest } from "../api/authService";



const Started = () => {

  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
        residence: '',
        preferredLocation: 'Select the location',
        preferredPlan: 'Select a plan',
        website: ''
      });

    
      const [termsAgreed, setTermsAgreed] = useState(false);
      const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
      const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [errors, setErrors] = useState({});
      const [showPopup, setShowPopup] = useState(false);
      const locationDropdownRef = useRef(null);
      const planDropdownRef = useRef(null);

      const planOptions = [
        'IMBIL Connect Classic', 
        'IMBIL Connect Pro', 
        'IMBIL Connect Premium', 
        'IMBIL Connect Ultimate'
      ];
      const locationOptions = [
        'Ikeja',
        'Surulere',
        'Lekki',
        
      ];

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
            setLocationDropdownOpen(false);
          }
          if (planDropdownRef.current && !planDropdownRef.current.contains(event.target)) {
            setPlanDropdownOpen(false);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        
        if (errors[name]) {
          setErrors({
            ...errors,
            [name]: ''
          });
        }
      };

      

      const handlePlanSelect = (plan) => {
        setFormData(prevState => ({
          ...prevState,
          preferredPlan: plan
        }));
        setPlanDropdownOpen(false);
      };
    
      const handleLocationSelect = (location) => {
        setFormData (prevState => ({
          ...prevState, 
          preferredLocation :location
        })) ;
       setLocationDropdownOpen(false);
      }

      const togglePlanDropdown = () => {
        setPlanDropdownOpen(!planDropdownOpen);
        // Close the other dropdown if it's open
        if (planDropdownOpen) setLocationDropdownOpen(false); 
    };

      const toggleLocationDropdown = () => {
        setLocationDropdownOpen(!locationDropdownOpen);
        // Close the other dropdown if it's open
        if (locationDropdownOpen) setLocationDropdownOpen(false);
      };

      const validateForm = () => {
        const newErrors = {};
        
        console.log("Name:", formData.name);
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        
        console.log("Phone:", formData.phone);
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        
        
        console.log("Email:", formData.email);
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        
        console.log("Residence:", formData.residence);
        if (!formData.residence.trim()) newErrors.residence = 'Residence is required';
        
        console.log("Preferred Location:", formData.preferredLocation);
        if (!formData.preferredLocation === 'Select Location') newErrors.preferredUsage = 'Please select location';
        
        console.log("Preferred Plan:", formData.preferredPlan);
        if (formData.preferredPlan === 'Select a plan') newErrors.preferredPlan = 'Please select a plan';
        
        console.log("Terms Agreed:", termsAgreed);
        if (!termsAgreed) newErrors.terms = 'You must agree to the terms and conditions';
        
        setErrors(newErrors);
        console.log("Validation errors:", newErrors);
        return Object.keys(newErrors).length === 0;
      };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const fullName = formData.name.trim().split(" ");

    const payload = {
      firstName: fullName[0] || "",
      lastName: fullName.slice(1).join(" ") || "",
      address: formData.address,
      email: formData.email,
      phoneNumber: formData.phone,
      preferredPlan: formData.preferredPlan,
      propertyType: "RESIDENTIAL",
      location: formData.preferredLocation,
      heardUs: formData.website || null
    };

   const response = await createRequest(payload);

console.log(response);

    console.log(response.data);

    setShowPopup(true);

  } catch (error) {
    console.error(error);

    setErrors({
      submit:
        error.response?.data?.message ||
        "An error occurred. Please try again."
    });
  } finally {
    setIsSubmitting(false);
  }
};
    
      const handleSignInClick = () => {
        navigate('/signin');
      };
      const handleClosePopup = () => {
        setShowPopup(false);
      };

      const navigateToSignin = () => {
        console.log('Navigating to signin...');
        // Uncomment this line for React Router
        navigate('/signin');
        
      
        setShowPopup(false);
      }; 
       

    return (

        <div className='get-started-container'>
          <div className="frame-241">
          <div className="frame-208">
            <div className="frame-215">
              <div className="frame-207">
                <h1 className="get-started-title">Get Started </h1>
              </div>
              
              <div className="frame-169">
                {/* Name field */}
                <div className="text-field">
                  <label className="field-label"> Full Name</label>
                  <div className="frame-163">
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                     <div className="component-3">
                      <img src={nameIcon} alt="Name" className="field-icon" />
                    </div>
                  </div>
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                
                {/* Email field */}
                <div className="text-field">
                  <label className="field-label">Phone Number</label>
                  <div className="frame-163">
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                    <div className="component-3">
                      <img src={numberIcon} alt="phone" className="field-icon" />
                    </div>
                  </div>
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                
                <div className="text-field">
                  <label className="field-label">Address</label>
                  <div className="frame-163">
                    <input 
                      type="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                    <div className="component-3">
                      {/* <img src={emailIcon} alt="Name" className="field-icon" /> */}
                    </div>
                  </div>
                  {errors.email && <div className="error-message">{errors.address}</div>}
                </div>
                      
                {/* Company field */}
                <div className="text-field">
                  <label className="field-label">Email</label>
                  <div className="frame-163">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                    <div className="component-3">
                      <img src={emailIcon} alt="Name" className="field-icon" />
                    </div>
                  </div>
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                {/* Website field */}
                <div className="text-field">
                  <label className="field-label">Estate, Residence/Office</label>
                  <div className="frame-163">
                    <input 
                      type="text"
                      name="residence"
                      value={formData.residence}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                     <div className="component-3">
                      <img src={residenceIcon} alt="Name" className="field-icon" />
                    </div>
                  </div>
                  {errors.residence && <div className="error-message">{errors.residence}</div>}
                </div>

                <div className="text-field">
                  <label className="field-label">How did you hear about us ?</label>
                  <div className="frame-163">
                    <input 
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                    <div className="component-3">
                      {/* <img src={nameIcon} alt="Name" className="field-icon" /> */}
                    </div>
                  </div>
                  <div className="error-message">Sorry, text field is required.</div>
                </div>


    {/* Preferred Usage dropdown */}
                  <div className="text-field-dropdown" ref={locationDropdownRef}>
                  <div className="text-field">
                    <label className="field-label">Location</label>
                    <div 
                      className="frame-163 dropdown-field"
                      onClick={toggleLocationDropdown}
                    >
                      <div className="preferred-plan-text">{formData.preferredLocation}</div>
                      <img 
                        src={expandArrow} 
                        alt="Expand" 
                        className={`expand-arrow ${locationDropdownOpen ? 'rotate' : ''}`} 
                      />
                    </div>
                    
                    {/* Dropdown options */}
                    {locationDropdownOpen && (
                      <div className="dropdown-options">
                        {locationOptions.map((location, index) => (
                          <div 
                            key={index}
                            className={`dropdown-option ${formData.preferredLocation === location ? 'selected' : ''}`}
                            onClick={() => handleLocationSelect(location)}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}
                     {errors.preferredLocation && <div className="error-message">{errors.preferredLocation}</div>}
                  </div>
                </div>

                
                
                {/* Preferred Plan dropdown */}
                <div className="text-field-dropdown" ref={planDropdownRef}>
                  <div className="text-field">
                    <label className="field-label"> Preferred Plan</label>
                    <div 
                      className="frame-163 dropdown-field"
                      onClick={togglePlanDropdown}
                    >
                      <div className="preferred-plan-text">{formData.preferredPlan}</div>
                      <img 
                        src={expandArrow} 
                        alt="Expand" 
                        className={`expand-arrow ${planDropdownOpen ? 'rotate' : ''}`} 
                      />
                    </div>
                    
                    {/* Dropdown options */}
                    {planDropdownOpen && (
                      <div className="dropdown-options">
                        {planOptions.map((plan, index) => (
                          <div 
                            key={index}
                            className={`dropdown-option ${formData.preferredPlan === plan ? 'selected' : ''}`}
                            onClick={() => handlePlanSelect(plan)}
                          >
                            {plan}
                          </div>
                        ))}
                      </div>
                    )}
                     {errors.preferredPlan && <div className="error-message">{errors.preferredPlan}</div>}
                  </div>
                </div>

                
                
                {/* Terms agreement checkbox */}
                <div className="check-agreement">
                  <div 
                    className={`frame-167 ${termsAgreed ? 'checked' : ''}`}
                    onClick={() => setTermsAgreed(!termsAgreed)}
                  >
                    <div className="done-check"></div>
                  </div>
                  <div className="terms-text">I have agreed to the terms and condition.</div>
                  {errors.terms && <div className="error-message">{errors.terms}</div>}
                </div>
                

                {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
                <button 
                className="large-button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <span className="button-text">
                  {isSubmitting ? 'Processing...' : 'Submit Request'}
                </span>
              </button>
                {/* Sign up link */}
               
              </div>
             
            </div>

          </div>
          <div className="frame-240">
  <div className="signup-text">
    Already have an account? 
    <span 
      className="sign-in-link" 
      onClick={handleSignInClick}
    >
      Sign in  
    </span>
  </div>
</div>
        </div>
            <div className='frame-168'>

            </div>
            <SuccessPopup 
        isOpen={showPopup} 
        onClose={handleClosePopup} 
        navigateToSignin={navigateToSignin}
      />
        </div>


       
    );
};

export default Started;