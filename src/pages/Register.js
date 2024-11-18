import React, { useState } from 'react';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const registerData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`+'/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <section className="sign-in-form section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto col-12">
              <h1 className="hero-title text-center mb-5">Sign Up</h1>
              <div className="row">
                <div className="col-lg-8 col-11 mx-auto">
                  <form onSubmit={handleRegister}>
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Email address"
                        required
                      />
                      <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating my-4">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                      />
                      <label htmlFor="confirm_password">Confirm Password</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn custom-btn form-control mt-4 mb-3">
                      Create account
                    </button>
                    <p className="text-center">
                      Already have an account? Please <a href="/login">Sign In</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Register;
