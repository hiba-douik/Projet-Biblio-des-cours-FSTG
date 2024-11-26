import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
import { toast } from 'react-toastify';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:9000/api/contacts', formData);
      if (response.status === 200 && response.data) {
        toast.success('Message envoyé avec succès!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Une erreur est survenue côté serveur.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(' Erreur lors de l\'envoi du message.');
    } finally {
      setIsSubmitting(false);
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
                <span className="d-block text-dark">love to hear you</span>
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
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Full name</label>
                </div>
                <div className="form-floating my-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    pattern="[^ @]*@[^ @]*"
                    className="form-control"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <label htmlFor="subject">Subject</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Leave a comment here"
                    required
                    style={{ height: 160 }}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <label htmlFor="message">Tell us about the project</label>
                </div>
                <div className="col-lg-5 col-6">
                  <button
                    type="submit"
                    className={`form-control ${isSubmitting ? 'btn-loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>
                        <i className="spinner-border spinner-border-sm me-2"></i> Sending...
                      </span>
                    ) : 'Send'}
                  </button>
                </div>
              </form>
            </div>

            {/* WhatsApp Contact Information */}
            <div className="col-lg-6 col-12 mt-5 ms-auto">
              <div className="row">
                <div className="col-6 border-end contact-info">
                  <h6 className="mb-3">New Business</h6>
                  <a href="mailto:hello@company.com" className="custom-link">
                    hello@company.com
                    <i className="bi-arrow-right ms-2" />
                  </a>
                </div>
                
                <div className="col-6 contact-info">
                  <h6 className="mb-3">Main Studio</h6>
                  <a href="mailto:studio@company.com" className="custom-link">
                    studio@company.com
                    <i className="bi-arrow-right ms-2" />
                  </a>
                </div>
                
                <div className="col-6 border-top border-end contact-info">
                  <h6 className="mb-3">Our Office</h6>
                  <p className="text-muted">
                    Akershusstranda 20, 0150 Oslo, Norway
                  </p>
                </div>
                
                <div className="col-6 border-top contact-info">
                  <h6 className="mb-3">Our Socials</h6>
                  <ul className="social-icon">
                    <li>
                      <a href="#" className="social-icon-link bi-messenger" />
                    </li>
                    <li>
                      <a href="#" className="social-icon-link bi-youtube" />
                    </li>
                    <li>
                      <a href="#" className="social-icon-link bi-instagram" />
                    </li>
                    <li>
                      <a href="#" className="social-icon-link bi-whatsapp" />
                    </li>
                  </ul>
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
