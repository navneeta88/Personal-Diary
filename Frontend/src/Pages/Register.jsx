import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, password });
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <h1>Create Account</h1>
        <p className="auth-subtitle">Start writing your story today</p>
        <form onSubmit={handleRegister}>
          <div className="field">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="field">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn" type="submit">Register</button>
        </form>
        <p className="switch-text">
          Already have an account?
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;