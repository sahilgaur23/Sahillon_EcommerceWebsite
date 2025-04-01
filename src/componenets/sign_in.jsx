import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign_in.css';

const SignInSignUp = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', 
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignIn) {
    
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email
        }));
        navigate('/'); 
      } else {
        setError('Invalid email or password');
      }
    } else {
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
  
      if (users.some(user => user.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

    
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      
      localStorage.setItem('currentUser', JSON.stringify({
        name: newUser.name,
        email: newUser.email
      }));

      navigate('/'); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isSignIn}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              minLength="6"
            />
          </div>

          <button type="submit" className="submit-btn">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="toggle-form">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            className="toggle-btn"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
