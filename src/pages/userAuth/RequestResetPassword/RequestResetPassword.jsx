import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './RequestResetPassword.css';
import instance from '../../api/API-URL-AXIOS.JS';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useContext } from 'react';
const RequestResetPassword = () => {
  const [countdown, setCountdown] = useState(5);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const requestResetPasswordUrl = '/api/v1/request-reset-password';
  const navigate = useNavigate();
  const {auth,setAuth} = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle password reset request logic here
    setLoading(true);
    try {
    const response= await instance.post(requestResetPasswordUrl,{email});
    console.log(response.data);
    const resetCode = response.data.resetCode;
    console.log(resetCode);
    setAuth({resetCode});
    setSuccess(true);
    setTimeout(() => {
      navigate("/auth/verify-reset-password");
    }, 5000);
    } catch (err) {
      if(err.response?.status===400){
        setError(err.response.data);
      }else if(err.response?.status===401){
        setError(err.response.data);
      }else if(err.response?.status===404){
        setError(err.response.data);
      }else if(err.response?.status===500){
        setError(err.response.data);
      }
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if(countdown>0){
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    (success ? (
      <div className="success-container">
        <h2 className="success-head">Success</h2>
        <p className="success-text">A reset password link has been sent to your email. Please check your inbox</p>
        <p className="success-text">You will be redirected to the login page in {countdown} seconds, Click here if the auto redirect does not work click <Link to="/auth/reset-password" className="success-link">here</Link></p>
      </div>
    ) : (
    <div className="request-reset-password-container">
      <form onSubmit={handleSubmit} className="request-reset-password-form">
        <h2>Reset Password</h2>
        <p>Enter the email address associated with your account We'll send you a link to reset your password.</p>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>Send Reset Link</button>
        <div className="links">
          <Link to="/auth/login">Back to Login</Link>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
      )  
    )
  );
};

export default RequestResetPassword;
