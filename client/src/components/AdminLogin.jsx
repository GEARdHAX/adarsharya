import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import '../styles/admin.css'; // Import the new CSS

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Access Denied: Invalid Credentials');
      }
    } catch (err) {
      setError('Server Error: Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-wrapper centered">
  <div className="admin-card login-card login-glass">

    {/* Back Button */}
    <button
      onClick={() => navigate('/')}
      className="admin-btn secondary small back-btn"
    >
      <ArrowLeft size={16} /> Back
    </button>

    {/* Lock Icon */}
    <div className="login-icon-wrap">
      <div className="login-icon-ring" />
      <Lock size={26} />
    </div>

    <h1 className="admin-title text-center">Admin Access</h1>
    <p className="admin-subtitle text-center">
      Secure login required to continue
    </p>

    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input login-input"
          placeholder="••••••••••••"
          autoFocus
        />
        {error && <p className="text-error">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="admin-btn primary w-full login-btn"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="spin" />
            Verifying…
          </>
        ) : (
          "Authenticate"
        )}
      </button>
    </form>
  </div>
</div>

  );
};

export default AdminLogin;