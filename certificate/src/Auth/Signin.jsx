import  { useState } from 'react';
import { useAuth } from "../Context/AuthContext"
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const[auth,setAuth]=useAuth()
  const navigate=useNavigate();

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
      const {data} = await axios.post('/api/auth/signin/uni', {email:formData.email,password:formData.password});
      if(data.success){
        setSuccessMessage(`University registered successfully!`);
        setAuth({
            ...auth,
            user:data.user,
            token:data.token
        })
        localStorage.setItem('auth',JSON.stringify(data))
        navigate('/uni/home')
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
        <h1>credBlock Sign In</h1>
      </div>

      {/* Registration Form */}
      <div className="form-container">
        <div className="form-content">
          <h2>SignIn with Your University</h2>
          
          <form onSubmit={handleSubmit}>
            
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

export default Signin;