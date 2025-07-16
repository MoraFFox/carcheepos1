import React, { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import instance from '../../api/API-URL-AXIOS.JS';
import AuthContext from '../../context/AuthContext/AuthContext';
const resetPasswordUrl = '/api/v1/reset-password';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(auth);
    if (!auth.tokenCode){
      setError("Token time out");
      return;
    }
    const token = auth.tokenCode;
    console.log(token);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    try {
      const response = await instance.patch(resetPasswordUrl, {password,confirmPassword,token});
      console.log('New password submitted');
      const accessToken = response.data.accessToken;
      const userRole = response.data.role;
      console.log(response.data);
      setAuth({accessToken, userRole});
      navigate("/auth/login");
    } catch (err) {
    if(err?.response?.status===401){
      setError("Invalid token");
    }
    else if(err?.response?.status===400){
      setError("Missing a Field");
    }
    else if(err?.response?.status===500){
      setError("Password requirments not met");
    }
    else{
      setError("Failed to reset password");
    }
    }
    finally{
      setLoading(false);
    }
    
  }

  return (
    (success ? (<div className="success-container">
      <h2 className="success-head">Success</h2>
      <p className="success-text">Your password has been reset successfully.</p>
      <Link to="/auth/login" className="success-link">Back to Login</Link>
    </div>) :
      (<div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
        <div className="input-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            // minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>Reset Password</button>
        <div className="links">
          <Link to="/auth/login">Back to Login</Link>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>)
    )
  )
}

export default ResetPassword;
