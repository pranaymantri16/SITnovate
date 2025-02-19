import  { useState } from 'react';
// import axios from 'axios';
import './Signup.css';

const UniversityRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
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
      const response = await axios.post('/api/universities', formData);
      setSuccessMessage(`University registered successfully! Code: ${response.data.code}`);
      setFormData({ name: '', location: '' });
    } catch (err) {
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
        <h1>credBlock</h1>
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