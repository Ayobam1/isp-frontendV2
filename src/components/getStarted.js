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




const Started = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: '',
  phone: '',
  address: '',
  email: '',
  preferredarea: 'Select City',
  preferredaboutus: 'Select how you heard about us',
  heardAboutUsValue: '',
  salesAgentName: ''
});
 
    
      const [termsAgreed, setTermsAgreed] = useState(false);
      const [areaDropdownOpen, setareaDropdownOpen] = useState(false);
       const [aboutusDropdownOpen, setaboutusDropdownOpen] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [errors, setErrors] = useState({});
      const [showPopup, setShowPopup] = useState(false);
      const areaDropdownRef = useRef(null);
      const aboutusDropdownRef = useRef(null);
      
      const areaOptions = [
        'Ikeja',
        'Surulere',
        'Lekki',
        
      ];

const aboutusOptions = [
  {
    label: 'Social Media',
    value: 'SOCIAL_MEDIA'
  },
  {
    label: 'Website',
    value: 'WEBSITE'
  },
  {
    label: 'Friend',
    value: 'FRIEND'
  },
  {
    label: 'Estate Manager',
    value: 'ESTATE_MANAGER'
  },
  {
    label: 'Sales Agent',
    value: 'SALES_AGENT'
  }
];

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target)) {
            setareaDropdownOpen(false);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

  useEffect(() => {
        const handleClickOutside = (event) => {
          if (aboutusDropdownRef.current && !aboutusDropdownRef.current.contains(event.target)) {
            setaboutusDropdownOpen(false);
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

    
    
      const handleareaSelect = (area) => {
        setFormData (prevState => ({
          ...prevState, 
          preferredarea :area
        })) ;
       setareaDropdownOpen(false);
      }

const handleaboutusSelect = (aboutus) => {
  setFormData((prevState) => ({
    ...prevState,
    


    preferredaboutus: aboutus.label,

    
    heardAboutUsValue: aboutus.value,

    // Clear the sales-agent name if another option is selected
    salesAgentName:
      aboutus.value === 'SALES_AGENT'
        ? prevState.salesAgentName
        : ''
  }));

  setaboutusDropdownOpen(false);
};

   
      const toggleareaopdown = () => {
        setareaDropdownOpen(!areaDropdownOpen);
        
        if (areaDropdownOpen) setareaDropdownOpen(false);
      };

       const toggleaboutusdropdown = () => {
        setaboutusDropdownOpen(!aboutusDropdownOpen);
        
        if (aboutusDropdownOpen) setaboutusDropdownOpen(false);
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

        
        console.log("Preferred Area:", formData.preferredarea);
        if (!formData.preferredarea === 'Select Area') newErrors.preferredUsage = 'Please select Area';

        console.log("Preferred Method of hearing:", formData.preferredaboutus);
       if (!formData.heardAboutUsValue) {
  newErrors.preferredaboutus =
    'Please select how you heard about us';
}

if (
  formData.heardAboutUsValue ===
    'SALES_AGENT' &&
  !formData.salesAgentName.trim()
) {
  newErrors.salesAgentName =
    'Please enter the sales agent’s name';
}

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

  // Stop submission if validation fails
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
  
    localStorage.setItem(
      "serviceRequestData",
      JSON.stringify(formData)
    );

  
    console.log(
      "Form data saved successfully:",
      JSON.parse(
        localStorage.getItem("serviceRequestData")
      )
    );


    navigate("/getstartedform");

  } catch (error) {
    console.error(
      "Error saving form information:",
      error
    );

    setErrors({
      submit:
        "An error occurred. Please try again."
    });

  } finally {
    setIsSubmitting(false);
  }
};

const handleSignInClick = () => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      name: "Test User" // Buybundle.js uses userData.name, not firstName/lastName
    })
  );
  localStorage.setItem("authToken", "mock-token-for-testing");
  navigate("/dashboard");
};
      const handleClosePopup = () => {
        setShowPopup(false);
      };

      const navigateToSignin = () => {
        console.log('Navigating to signin...');
       
        navigate("/dashboard");
        
      
        setShowPopup(false);
      }; 
       

    return (

        <div className='get-started-container'>
            <div className="frame-168-mobile">
      <button className="hero-close-btn" onClick={() => navigate('/home')}>✕</button>
    </div>
          <div className="frame-241">
          <div className="frame-208">
            <div className="frame-215">
              <div className="frame-207">
                <h1 className="get-started-title">Service Request Form </h1>
              </div>
              
              <div className="frame-169">
                {/* Name field */}
                <div className="text-field">
                  <label className="field-label"> Full Name</label>
                  <div className="frame-163">
                    <input 
                      type="text"
                      name="name"
                      placeholder='John Doe'
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
                  <label className="field-label">Email</label>
                  <div className="frame-163">
                    <input 
                      type="email"
                      name="email"
                      placeholder='email@example.com'
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
            
                {/* Phone Number field */}
                <div className="text-field">
                   <label className="field-label">Phone Number</label>
                     <div className="frame-163">
    <div className="country-code">
      <span className="country-code-text">+234</span>
    </div>
    <input 
      type="tel"
      name="phone"
      placeholder="800 000 0000"
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
                
                 {/* Address field */}
                <div className="text-field">
                  <label className="field-label">Address</label>
                  <div className="frame-163">
                    <input 
                      type="address"
                      name="address"
                      placeholder='123 Innovation Drive'
                      value={formData.address}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                    <div className="component-3">
                      <img src={nameIcon} alt="Name" className="field-icon" />
                    </div>
                  </div>
                  {errors.email && <div className="error-message">{errors.address}</div>}
                </div>
                      
                      {/* area dropdown  */}
                 <div className="text-field-dropdown" ref={areaDropdownRef}>
                  <div className="text-field">
                    <label className="field-label">Area</label>
                    <div 
                      className="frame-163 dropdown-field"
                      onClick={toggleareaopdown}
                    >
                      <div className="preferred-plan-text">{formData.preferredarea}</div>
                      <img 
                        src={expandArrow} 
                        alt="Expand" 
                        className={`expand-arrow ${areaDropdownOpen ? 'rotate' : ''}`} 
                      />
                    </div>
                    
                    {/* Dropdown options */}
                    {areaDropdownOpen && (
                      <div className="dropdown-options">
                        {areaOptions.map((area, index) => (
                          <div 
                            key={index}
                            className={`dropdown-option ${formData.preferredarea === area ? 'selected' : ''}`}
                            onClick={() => handleareaSelect(area)}
                          >
                            {area}
                          </div>
                        ))}
                      </div>
                    )}
                     {errors.preferredarea && <div className="error-message">{errors.preferredarea}</div>}
                  </div>
                </div>
              
                  {/* how did you hear about us  */}
               {/* How did you hear about us */}
<div
  className="text-field-dropdown"
  ref={aboutusDropdownRef}
>
  <div className="text-field">
    <label className="field-label">
      How did you hear about us
    </label>

    <div
      className="frame-163 dropdown-field"
      onClick={toggleaboutusdropdown}
    >
      <div className="preferred-plan-text">
        {formData.preferredaboutus}
      </div>

      <img
        src={expandArrow}
        alt="Expand"
        className={`expand-arrow ${
          aboutusDropdownOpen ? 'rotate' : ''
        }`}
      />
    </div>

    {/* Dropdown options */}
    {aboutusDropdownOpen && (
      <div className="dropdown-options">
        {aboutusOptions.map((aboutus) => (
          <div
            key={aboutus.value}
            className={`dropdown-option ${
              formData.heardAboutUsValue ===
              aboutus.value
                ? 'selected'
                : ''
            }`}
            onClick={() =>
              handleaboutusSelect(aboutus)
            }
          >
            {aboutus.label}
          </div>
        ))}
      </div>
    )}

    {errors.preferredaboutus && (
      <div className="error-message">
        {errors.preferredaboutus}
      </div>
    )}
  </div>
</div>
                 
                 {/* Sales Agent  */}
                  {formData.preferredaboutus === 'Sales Agent' && (
  <div className="text-field">
    <label className="field-label">
      Sales Agent Name
    </label>

    <div className="frame-163">
      <input
        type="text"
        name="salesAgentName"
        placeholder="Enter the sales agent's name"
        value={formData.salesAgentName}
        onChange={handleInputChange}
        className="startedinput-field"
      />
    </div>

    {errors.salesAgentName && (
      <div className="error-message">
        {errors.salesAgentName}
      </div>
    )}
  </div>
)}


                
                {/* Terms agreement checkbox */}
                <div className="check-agreement">
  <div className="terms-row">
    <div 
      className={`frame-167 ${termsAgreed ? 'checked' : ''}`}
      onClick={() => setTermsAgreed(!termsAgreed)}
    >
      <div className="done-check"></div>
    </div>
    <div className="terms-text">I have agreed to the terms and condition.</div>
  </div>
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

              <div className="frame-168-desktop"></div>

            <SuccessPopup 
        isOpen={showPopup} 
        onClose={handleClosePopup} 
        navigateToSignin={navigateToSignin}
      />
        </div>


       
    );
};

export default Started;