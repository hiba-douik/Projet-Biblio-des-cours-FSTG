import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layouts/Footer'; 
import Navbar from '../layouts/Navbar'; 

function Login() {
    console.log("API URL: ", `${process.env.REACT_APP_API_URL}/api/auth/document/all`);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');  // Réinitialise le message d'erreur
      
        try {

            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}`+"/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
      
            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                
                if (loginData.token) {
                    localStorage.setItem('token', loginData.token);
                    
                    // Récupère les informations utilisateur en utilisant le token
                    const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${email}`, {
                        headers: {
                            'Authorization': `Bearer ${loginData.token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        const clientLogin = {
                            token: loginData.token,
                            ...userData  // Enregistre tous les attributs de l'utilisateur
                        };

                        localStorage.setItem('clientLogin', JSON.stringify(clientLogin));
                        navigate('/profile');
                    } else {
                        throw new Error('Impossible de récupérer les informations utilisateur');
                    }
                } else {
                    throw new Error('Token non reçu');
                }
            } else {
                // Gestion des erreurs selon le statut de réponse
                if (loginResponse.status === 401) {
                    setErrorMessage('Email ou mot de passe incorrect.');
                } else if (loginResponse.status === 400) {
                    setErrorMessage('Requête invalide. Veuillez vérifier les informations fournies.');
                } else {
                    setErrorMessage('Erreur de connexion. Veuillez réessayer plus tard.');
                }
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setErrorMessage(error.message); // Affiche le message d'erreur capturé
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
