import { Link } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../Context/AuthContext';

const HomePage = () => {
  
  // eslint-disable-next-line no-unused-vars
  const [auth,setAuth]=useAuth();
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <h1>credBlock</h1>
        </div>
        <div className="nav-buttons">
          <Link  className="nav-btn">About</Link>
          <Link to="/signup" className="nav-btn">Sign Up</Link>
          <Link to="/signin" className="nav-btn signin">Sign In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      {auth?(
      <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="main-heading">
              Secure Digital Certificates
              <span className="sub-brand">by credBlock</span>
            </h1>
            <p className="sub-heading">
              Get storage, retrieval and verification solution in one app
            </p>
            <button className="get-started-btn">Upload your certificate</button>
          </div>
          <div className="hero-image">
            <img src="../../public/credBlock.jpg" alt="Digital Certificates" />
          </div>
        </div>
      </section>
      </>
    ):
      (
        <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="main-heading">
              Secure Digital Certificates
              <span className="sub-brand">by credBlock</span>
            </h1>
            <p className="sub-heading">
              Get storage, retrieval and verification solution in one app
            </p>
            <button className="get-started-btn">Get Started</button>
          </div>
          <div className="hero-image">
            <img src="credBlock.jpg" alt="Digital Certificates" />
          </div>
        </div>
      </section>
      <section className="features-section">
        <h2 className="features-heading">Why Choose CertChain?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon shield"></div>
            <h3>Secure & Immutable</h3>
            <p>Certificates are stored on the blockchain, making them tamper-proof and permanently verifiable.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon verify"></div>
            <h3>Instant Verification</h3>
            <p>Verify certificates instantly without any intermediaries or manual processes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon integration"></div>
            <h3>Easy Integration</h3>
            <p>Simple integration with existing university systems and workflows.</p>
          </div>
        </div>
      </section>
      </>
      )}
    </div>
  );
};

export default HomePage;