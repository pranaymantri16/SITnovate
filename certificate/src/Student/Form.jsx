import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import './getForm.css'

const Form = () => {
    const [dob,setDob]=useState('');
    const [auth,setAuth]=useAuth();
    const[certificates,setCertificate]=useState()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
        const {data}=await axios.get('/api/auth/certificate',{email:auth?.user?.email,dob:dob});
        console.log(data)
        if(data.success){
            alert(data.message)
            setCertificate(data.certificates);
        }
    }
    catch(error){
        console.log(error)
        }
    }
    return (
        <div className="container">
          {/* Left side - Image */}
          <div className="image-section">
            <img src="/images/document-library.jpg" alt="Digital document library" />
            <div className="image-overlay">
              <div className="overlay-content">
                <h1>Retrieve Your Documents</h1>
                <p>Access your personal PDF documents securely through our Lighthouse storage system.</p>
              </div>
            </div>
          </div>
          
          {/* Right side - PDF Retrieval Form */}
          <div className="form-section">
            <div className="form-container pdf-retrieval-form">
              <div className="logo">
                <span className="logo-text">credBlock Student</span>
              </div>
              <h2 className="form-title">PDF Document Retrieval</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input 
                    type="date" 
                    id="dob" 
                    className="form-control" 
                    value={dob}
                    onChange={(e)=>{setDob(e.target.value)}}
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary">Retrieve</button>
                </form>
            </div>
        </div>
        </div>
      );
}

export default Form