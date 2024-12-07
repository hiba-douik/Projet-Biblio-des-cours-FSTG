import React, { useState } from 'react';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';

function Contact() {
  // State to store form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // State to store success/error message
  const [status, setStatus] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // Reset status

    try {
      // Send form data to API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <header className="site-header section-padding-img site-header-image">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-12 header-info">
              <h1>
                <span className="d-block text-primary">Say hello to us</span>
                <span className="d-block text-dark">We'd love to hear from you</span>
              </h1>
            </div>
          </div>
        </div>
        <img
          src="template_user/images/header/positive-european-woman-has-break-after-work.jpg"
          className="header-image img-fluid"
          alt=""
        />
      </header>

      <section className="contact section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="mb-4">
                Let's <span>begin</span>
              </h2>
              <form className="contact-form me-lg-5 pe-lg-3" onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="form-control"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Full name</label>
                </div>
                <div className="form-floating my-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating my-4">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="subject">Subject</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Leave a comment here"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ height: 160 }}
                  />
                  <label htmlFor="message">Tell us about the project</label>
                </div>
                <div className="col-lg-5 col-6">
                  <button type="submit" className="form-control">
                    Send
                  </button>
                </div>
              </form>
              {status && <p className="mt-3">{status}</p>}
            </div>
            <div className="col-lg-6 col-12 mt-5 ms-auto">
              <div className="row">
                <div className="col-6 border-end contact-info">
                  <h6 className="mb-3">New Business</h6>
                  <a href="mailto:hello@company.com" className="custom-link">
                    readme@agency.com
                    <i className="bi-arrow-right ms-2" />
                  </a>
                </div>
                <div className="col-6 contact-info">
                  <h6 className="mb-3">Main Studio</h6>
                  <a href="mailto:studio@company.com" className="custom-link">
                    readme@company.com
                    <i className="bi-arrow-right ms-2" />
                  </a>
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

export default Contact;
