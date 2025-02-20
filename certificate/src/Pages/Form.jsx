import { useState } from "react";
import axios from "axios";
const Form = () => {
  const [dob, setDob] = useState("");
  const [certificateCID, setCertificateCID] = useState(null);
  const [email, setEmail] = useState("");

  async function downloadCertificate() {
    if (!certificateCID) {
      alert("No certificate available for download.");
      return;
    }
    try {
      const fileUrl = `/https://gateway.lighthouse.storage/ipfs/${certificateCID}`;
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${certificateCID}.pdf`; // Ensure file has .pdf extension
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Error downloading certificate. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/getcertificate", {
        email,
        dob,
      });

      if (data.success && data.certificate.length > 0) {
        alert("Certificate found!");
        setCertificateCID(data.certificate[0].pdfHash);
      } else {
        alert("No certificate found. Please check your details.");
      }
    } catch (error) {
      console.error("Error retrieving certificate:", error);
      alert("Failed to retrieve certificate.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fbfd", padding: "2rem" }}>
      {/* Left side - Image */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <img
          src="/student.jpeg"
          alt="Digital document library"
          style={{ width: "100%", maxWidth: "500px", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)"}}
        />
      </div>

      {/* Right side - PDF Retrieval Form */}
      <div style={{ flex: 1, maxWidth: "500px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)", padding: "2.5rem", textAlign: "center" }}>
        <h2 style={{ color: "#333", fontSize: "1.8rem", marginBottom: "1rem" }}>PDF Document Retrieval</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#444" }} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "1rem" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#444", marginTop: "1rem" }} htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "1rem" }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "1rem", border: "none", borderRadius: "8px", background: "linear-gradient(45deg, #2196F3, #00BCD4)", color: "white", fontWeight: "600", fontSize: "1rem", cursor: "pointer", transition: "all 0.3s", marginTop: "1rem", boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)" }}>
            Retrieve
          </button>
        </form>

        {certificateCID && (
          <button
            onClick={downloadCertificate}
            style={{ width: "100%", padding: "1rem", border: "none", borderRadius: "8px", background: "linear-gradient(45deg, #4CAF50, #8BC34A)", color: "white", fontWeight: "600", fontSize: "1rem", cursor: "pointer", transition: "all 0.3s", marginTop: "1rem", boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)" }}
          >
            Download Certificate
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
