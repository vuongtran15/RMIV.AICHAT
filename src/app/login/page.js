'use client';
import { useState, useEffect } from 'react';
import './login.scss';
import { useRouter } from 'next/navigation';

export default function Login() {
 


  // For the animated background effect
  const [bubbles, setBubbles] = useState([]);

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
  }, []);


  

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
        <div className='login-body'>
          <div className='login-header'>
            <img src="/images/logo.png" className='logo'/>
            <div className='login-title'>ROS</div>
          </div>
          <div className='form-content'>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required />
              </div>
              <button type="submit" className='login-button'>Login</button>
            </form>
          </div>
        </div>
        <div className='login-caption'></div>
      </div>
    </div>
  );
}
