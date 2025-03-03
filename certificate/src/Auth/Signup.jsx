import  { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from "react-router-dom";
const UniversityRegistration = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email:'',
    password:'',
    cfmpwd:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if(formData.password!=formData.cfmpwd){
        setError('Password mismatch');
        return;
      }
      const {data} = await axios.post('/api/auth/signup/uni', {name:formData.name,location:formData.location,email:formData.email,password:formData.password});
      if(data.success){
        setSuccessMessage(`University registered successfully!`);
        navigate('/signin')
      }
      else{
        setError(data.message);
      }
     
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || 'Error registering university');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-page">
      {/* Background Image */}
      <div className="background-image" />
      
      {/* Brand Logo */}
      <div className="brand-logo">
        <h1>credBlock Sign Up</h1>
      </div>

      {/* Registration Form */}
      <div className="form-container">
        <div className="form-content">
          <h2>Register Your University</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="University Name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="University Email"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="cfmpwd"
                value={formData.cfmpwd}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Location"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversityRegistration;