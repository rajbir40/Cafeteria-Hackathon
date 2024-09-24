import React, { useState } from 'react';
import './login.css';
import SignInImage from "../../assets/log.jpg";
import { useCookies } from 'react-cookie';

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(`${serverURL}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      });

      const data = await response.json();

      if (response.ok) {
        setCookie('token', data.token, { path: '/' });
        window.location.href = '/menu';
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred, please try again later');
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={SignInImage} alt="sing up" /></figure>
              <a href="/sign-up" className="signup-image-link">Create an account</a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form onSubmit={handleSubmit} className="register-form" id="login-form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group form-button">
                  <button type="submit" name="signin" id="signin" className="form-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
