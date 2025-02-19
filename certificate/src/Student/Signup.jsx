import { useState } from 'react';
import './StudentPortal.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';

const StudentRegistration = () => {
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[cfm,setcfmPwd]=useState();
    const [error, setError] = useState('');
    const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add registration logic here
    if(cfm!=password){
        setError("Password Mismatch");
        return;
    }
    try{
    const {data}=await axios.post('/api/auth/signup/stud',{email,password})
    if(data.success){
        
        navigate('/stud/signin');
    }
    else{
        setError(data.message)
    }
} catch(error){
        console.log("Error while Sign-up in student")
        console.log(error)
        setError(error)
    }
  };

  return (
    <div className="container">
      {/* Left side - Image */}
      <div className="image-section">
        <img src="../../public/student.jpeg" alt="Students in university library" />
        <div className="image-overlay">
          <div className="overlay-content">
            <h1>Start Your Academic Journey</h1>
            <p>Join thousands of students building their future with verified credentials.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Registration Form */}
      <div className="form-section">
        <div className="form-container registration-form">
          <div className="logo">
            <span className="logo-text">credBlock</span>
          </div>
          
          <h2 className="form-title">Student Registration</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="form-control" 
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="form-control" 
                placeholder="Create a password" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                value={cfm}
                onChange={(e)=>{setcfmPwd(e.target.value)}}
                className="form-control" 
                placeholder="Confirm your password" 
                required 
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn-primary btn-register">Register</button>
          </form>
          
          <div className="alt-link">
            Already have an account? <Link to="/stud/signin">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;