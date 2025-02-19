import { useState } from 'react';
import './StudentPortal.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const StudentLogin = () => {
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const navigate=useNavigate()
  const [error, setError] = useState('');
  const [auth,setAuth]=useAuth();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add login logic here
    try{
      const {data}=await axios.post('/api/auth/signin/stud',{email,password})
      if(data.success){
        setAuth({
          ...auth,
          user:data.user,
          token:data.token
      })
      localStorage.setItem("auth",JSON.stringify(data));
      alert(data.message)
          alert(data.message)
          navigate('/student/home');
      }
      else{
          setError(data.message)
      }
  } catch(error){
          console.log("Error while Sign-up in student")
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
            <h1>Welcome Back</h1>
            <p>Access your academic records, courses, and credentials securely with credBlock.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="form-section">
        <div className="form-container login-form">
          <div className="logo">
            <span className="logo-text">credBlock</span>
          </div>
          
          <h2 className="form-title">Student Login</h2>
          
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
                placeholder="Enter your password" 
                required 
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn-primary btn-login">Login</button>
          </form>
          
          <div className="alt-link">
            Do not have an account? <Link to="/stud/signup">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;