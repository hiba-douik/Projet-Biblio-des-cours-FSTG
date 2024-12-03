import React, { useState } from "react";
import Footer from "../components/Users/layouts/Footer";
import Navbar from "../components/Users/layouts/Navbar";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!image) {
      setError("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("User registered successfully.");
        window.location.href = "/login";
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
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
                  <form onSubmit={handleRegister} encType="multipart/form-data">
                    <div className="form-floating">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Email address"
                        required
                      />
                      <label>Email address</label>
                    </div>
                    <div className="form-floating my-4">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <label>Password</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                      />
                      <label>Confirm Password</label>
                    </div>
                    <div className="form-group my-4">
                      <label>Upload Profile Picture</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control"
                      />
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          className="img-thumbnail mt-3"
                          style={{ width: "150px", height: "150px" }}
                        />
                      )}
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button
                      type="submit"
                      className="btn custom-btn form-control mt-4 mb-3"
                    >
                      Create account
                    </button>
                    <p className="text-center">
                      Already have an account? <a href="/login">Sign In</a>
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
