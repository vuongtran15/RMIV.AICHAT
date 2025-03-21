'use client';
import { useState, useEffect } from 'react';
import './login.css';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // For the animated background effect
  const [bubbles, setBubbles] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Create animated bubbles in the background
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 20; i++) {
        newBubbles.push({
          id: i,
          left: Math.random() * 100 + '%',
          size: Math.random() * 40 + 10,
          opacity: Math.random() * 0.3 + 0.1, // More subtle opacity
          duration: Math.random() * 15 + 10 + 's',
          delay: Math.random() * 5 + 's',
          color: ['#ff80ab', '#ffb2cc', '#c94f7c'][Math.floor(Math.random() * 3)] // Pink palette
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();

    // Real-time clock update
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock(); // Initial call
    const clockInterval = setInterval(updateClock, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call authentication API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      // Handle successful login
      setLoginSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="bubbles-container">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              left: bubble.left,
              width: bubble.size + 'px',
              height: bubble.size + 'px',
              opacity: bubble.opacity,
              animationDuration: bubble.duration,
              animationDelay: bubble.delay,
              backgroundColor: bubble.color,
              boxShadow: `0 0 10px ${bubble.color}, 0 0 20px ${bubble.color}`
            }}
          ></div>
        ))}
      </div>

      <div className="login-form">
        <div className="cyberpunk-border"></div>
        <div className="login-content">
          <h2 className="cyber-glitch">ROS<span className="neon-text"> LOGIN</span></h2>
          <p className="subtitle">ACCESS TO SYSTEM</p>

          {loginSuccess ? (
            <div className="success-message">
              <p>Login successful! Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}

              <div className="holographic-input">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <div className="input-label">USER ID</div>
                <div className="input-glow"></div>
              </div>

              <div className="holographic-input">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <div className="input-label">PASSWORD</div>
                <div className="input-glow"></div>
              </div>

              <button
                type="submit"
                className={`cyber-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                <span className="button-text">
                  {isLoading ? 'PROCESSING...' : 'LOGIN'}
                </span>
                <span className="button-glitch"></span>
              </button>
            </form>
          )}

          <div className="login-footer">
            <div className="cyber-text cyber-clock">{currentTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
