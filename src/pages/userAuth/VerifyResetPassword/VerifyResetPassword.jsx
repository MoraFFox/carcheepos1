import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './VerifyResetPassword.css';
import instance from '../../api/API-URL-AXIOS.JS';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
const verifyUrl = '/api/v1/verify-reset-password';
const VerifyResetPassword = () => {
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {auth,setAuth} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(resetCode);
      // Replace with your actual authentication logic
      const response = await instance.post(verifyUrl, {resetCode});
      console.log(response);
      const tokenCode = response.data.token;
      console.log(tokenCode);
      setAuth({tokenCode});
      navigate("/auth/reset-password");
    } catch (err) {
      if(err?.response?.status===404){
        setError("No email found with this code");
      }
      else if(err?.response?.status===401){
        setError("Invalid reset code");
      }else if(err?.response?.status===500){
        setError("Failed to verify");
      }
    }finally{
      setLoading(false);
    }
    
  };

  return (
    (success ? (
      <div className="success-container">
        <h2 className="success-head">Success</h2>
        <p className="success-text">Your token has been verified successfully.</p>
        <Link to="/auth/reset-password" className="success-link">Redirect to Reset Password</Link>
      </div>
    ) : (
    <div className="verify-reset-password-container">
      <form onSubmit={handleSubmit} className="verify-reset-password-form">
        <h2>Verify Code</h2>
        <p>A token has been sent to your email. Please enter it below to proceed.</p>
        <div className="input-group">
          <label htmlFor="token">Verification Code</label>
          <input
            type="text"
            id="token"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>Verify</button>
        <div className="links">
          <Link to="/auth/login">Back to Login</Link>
        </div>
        {error && <div className="error-message"><br />{error}</div>}
      </form>
    </div>
    )
  )
)

};

export default VerifyResetPassword;
