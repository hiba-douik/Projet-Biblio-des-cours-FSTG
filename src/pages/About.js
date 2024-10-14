import React from 'react'
import Footer from '../components/Users/layouts/Footer'
import Navbar from '../components/Users/layouts/Navbar'

function About() {
  return (
    <div>
      <Navbar/>
        <header className="site-header section-padding-img site-header-image">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12 header-info">
          <h1>
            <span className="d-block text-primary">Company</span>
            <span className="d-block text-dark">Fashion</span>
          </h1>
        </div>
      </div>
    </div>
    <img
      src="template_user/images/header/businesspeople-meeting-office-working.jpg"
      className="header-image img-fluid"
      alt=""
    />
  </header>
  <section className="team section-padding">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-5">
            Meet our <span>team</span>
          </h2>
        </div>
        <div className="col-lg-4 mb-4 col-12">
          <div className="team-thumb d-flex align-items-center">
            <img
              src="template_user/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg"
              className="img-fluid custom-circle-image team-image me-4"
              alt=""
            />
            <div className="team-info">
              <h5 className="mb-0">Don</h5>
              <strong className="text-muted">Product, VP</strong>
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn custom-modal-btn"
                data-bs-toggle="modal"
                data-bs-target="#don"
              >
                <i className="bi-plus-circle-fill" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4 col-12">
          <div className="team-thumb d-flex align-items-center">
            <img
              src="template_user/images/people/portrait-british-woman.jpeg"
              className="img-fluid custom-circle-image team-image me-4"
              alt=""
            />
            <div className="team-info">
              <h5 className="mb-0">Kelly</h5>
              <strong className="text-muted">Marketing</strong>
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn custom-modal-btn"
                data-bs-toggle="modal"
                data-bs-target="#kelly"
              >
                <i className="bi-plus-circle-fill" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-lg-0 mb-4 col-12">
          <div className="team-thumb d-flex align-items-center">
            <img
              src="template_user/images/people/beautiful-woman-face-portrait-brown-background.jpeg"
              className="img-fluid custom-circle-image team-image me-4"
              alt=""
            />
            <div className="team-info">
              <h5 className="mb-0">Marie</h5>
              <strong className="text-muted">Founder</strong>
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn custom-modal-btn"
                data-bs-toggle="modal"
                data-bs-target="#marie"
              >
                <i className="bi-plus-circle-fill" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="testimonial section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mx-auto col-11">
          <h2 className="text-center">
            Customer love, <br /> <span>Little</span> Fashion
          </h2>
          <div className="slick-testimonial">
            <div className="slick-testimonial-caption">
              <p className="lead">
                Over three years in business, We’ve had the chance to work on a
                variety of projects, with companies Lorem ipsum dolor sit amet
              </p>
              <div className="slick-testimonial-client d-flex align-items-center mt-4">
                <img
                  src="template_user/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg"
                  className="img-fluid custom-circle-image me-3"
                  alt=""
                />
                <span>
                  George,{" "}
                  <strong className="text-muted">Digital Art Fashion</strong>
                </span>
              </div>
            </div>
            <div className="slick-testimonial-caption">
              <p className="lead">
                Over three years in business, We’ve had the chance to work on a
                variety of projects, with companies Lorem ipsum dolor sit amet
              </p>
              <div className="slick-testimonial-client d-flex align-items-center mt-4">
                <img
                  src="template_user/images/people/beautiful-woman-face-portrait-brown-background.jpeg"
                  className="img-fluid custom-circle-image me-3"
                  alt=""
                />
                <span>
                  Sandar,{" "}
                  <strong className="text-muted">Zoom Fashion Idea</strong>
                </span>
              </div>
            </div>
            <div className="slick-testimonial-caption">
              <p className="lead">
                Over three years in business, We’ve had the chance to work on a
                variety of projects, with companies Lorem ipsum dolor sit amet
              </p>
              <div className="slick-testimonial-client d-flex align-items-center mt-4">
                <img
                  src="template_user/images/people/portrait-british-woman.jpeg"
                  className="img-fluid custom-circle-image me-3"
                  alt=""
                />
                <span>
                  Marie,{" "}
                  <strong className="text-muted">Art Fashion Design</strong>
                </span>
              </div>
            </div>
            <div className="slick-testimonial-caption">
              <p className="lead">
                Over three years in business, We’ve had the chance to work on a
                variety of projects, with companies Lorem ipsum dolor sit amet
              </p>
              <div className="slick-testimonial-client d-flex align-items-center mt-4">
                <img
                  src="template_user/images/people/woman-wearing-mask-face-closeup-covid-19-green-background.jpeg"
                  className="img-fluid custom-circle-image me-3"
                  alt=""
                />
                <span>
                  Catherine,{" "}
                  <strong className="text-muted">Dress Fashion</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
    </div>
  )
}

export default About