import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import './getForm.css'

const Form = () => {
    const [dob,setDob]=useState('');
    // eslint-disable-next-line no-unused-vars
    const [auth,setAuth]=useAuth();
    const[certificates,setCertificate]=useState()

    async function downloadCertificate(certificateCID) {
        try {
          // Construct Lighthouse gateway URL
          const fileUrl = `https://gateway.lighthouse.storage/ipfs/${certificateCID}`;
      
          // Fetch file as a blob
          const response = await fetch(fileUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
          }
      
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
      
          // Create an invisible link & trigger download
          const a = document.createElement("a");
          a.href = url;
          a.download = "certificate.pdf";  // Change file extension as needed
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      
          // Cleanup the object URL
          window.URL.revokeObjectURL(url);
      
          console.log("File downloaded successfully!");
        } catch (error) {
          console.error("Error downloading certificate:", error);
        }
      }
      

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
            {certificates && (
            <button
            onClick={() => downloadCertificate(certificates)}
            className="px-4 py-2 bg-blue-500 text-white rounded">
            Download Certificate
            </button>
            )}
        </div>
        </div>
      );
}

export default Form