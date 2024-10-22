import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layouts/Footer'; 
import Navbar from '../layouts/Navbar'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
      
        try {
          const response = await fetch('http://localhost:9000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          console.log('Response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Parsed response data:', data);
      
           
            if (data.token) {
              localStorage.setItem('token', data.token);
              navigate('/profile'); 
            } else {
              throw new Error('No token received');
            }
          } else {
            
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
          }
        } catch (error) {
          console.error('Error during login:', error);
          setErrorMessage(error.message);
        }
      };
      
  
    return (
        <div>
            <Navbar />
            <section className="sign-in-form section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto col-12">
                            <h1 className="hero-title text-center mb-5">Sign In</h1>
                            {errorMessage && (
                                <div className="alert alert-danger text-center">{errorMessage}</div>
                            )}
                            <div className="row">
                                <div className="col-lg-8 col-11 mx-auto">
                                    <form role="form" onSubmit={handleSubmit}>
                                        <div className="form-floating mb-4 p-0">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="email">Email address</label>
                                        </div>
                                        <div className="form-floating p-0">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn custom-btn form-control mt-4 mb-3"
                                        >
                                            Sign in
                                        </button>
                                        <p className="text-center">
                                            Don’t have an account? <a href="/register">Create One</a>
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

export default Login;
