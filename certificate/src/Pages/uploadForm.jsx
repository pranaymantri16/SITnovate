import  { useEffect, useState } from 'react';
import './uploadForm.css';
import lighthouse from "@lighthouse-web3/sdk"
import contract from '../Context/ABIContract';

const CertificateUpload = () => {
  const [formData, setFormData] = useState({
    email: '',
    dob: '',
    file: null
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfHash,setpdfHash]=useState('')
  // eslint-disable-next-line no-unused-vars
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [IsMetaMaskConnected,setIsMetaMaskConnected]=useState(false)
  // eslint-disable-next-line no-unused-vars
  const [acc,setAcc]=useState('')
  const apiKey = 'fe386a57.500c16bd68584fedb93735086789a970';
  // eslint-disable-next-line no-unused-vars
  const[unique,setUniqueHash]=useState("");

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    contract.on("CertificateCreated", (blockNumber, uniqueHash, email, pdfHash,dob) => {
      console.log("Certificate Created at Block:", blockNumber);
      console.log("Unique Hash:", uniqueHash);
      setUniqueHash(uniqueHash);
    });

    return () => {
      contract.removeAllListeners("CertificateCreated"); 
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files && files[0]) {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.dob) {
      errors.dob = 'Date of Birth is required';
    }
    
    if (!formData.file) {
      errors.file = 'Certificate PDF is required';
    } else if (formData.file.type !== 'application/pdf') {
      errors.file = 'Only PDF files are accepted';
    }
    
    return errors;
  };
  const createCertificateBlock=async()=>{
    try {
        const tx = await contract.createCertificate(
            formData.email,
            pdfHash,
            formData.dob
          );
          await tx.wait(); // Wait for transaction confirmation
          console.log("Transaction sent, waiting for event...");
      } catch (error) {
        console.error("Error:", error);
      }
  }

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);
          setAcc(accounts)
        }
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      alert('Please install MetaMask to continue');
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      const file=formData?.file;
      const uploadResponse = await lighthouse.upload([file], apiKey);
      setpdfHash(uploadResponse);
      await createCertificateBlock();
      setIsSubmitting(false)      
    }
    else{
        return;
    }
  };

  return (
    <>
    {IsMetaMaskConnected?(
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-heading">Upload your certificate</h1>
        <p className="upload-subheading">submit the certificate in form of pdf</p>
        {submitSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>Certificate successfully uploaded!</p>
          </div>
        ) : (
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={formErrors.email ? "error" : ""}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={formErrors.dob ? "error" : ""}
              />
              {formErrors.dob && <span className="error-message">{formErrors.dob}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="file">Upload Certificate (PDF only)</label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleChange}
                  className={formErrors.file ? "error" : ""}
                />
                <div className="file-input-label">
                  {formData.file ? formData.file.name : "Choose file"}
                </div>
              </div>
              {formErrors.file && <span className="error-message">{formErrors.file}</span>}
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Submit Certificate"}
            </button>
          </form>
        )}
      </div>
    </div>

      ):(
        <>
        <h1 className="upload-heading">Connect to your metamask Account</h1>
          <button 
            onClick={connectMetaMask}
            className={`submit-button ${IsMetaMaskConnected ? 'connected' : ''}`}
          >
            {IsMetaMaskConnected ? 'MetaMask Connected' : 'Connect MetaMask'}
          </button>
        </>
      )}
    </>
  );
};

export default CertificateUpload;