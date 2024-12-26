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
            <span className="d-block text-primary">LET READ </span>
            <span className="d-block text-dark"> ME </span>
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
            Notres  <span>equipe</span>
          </h2>
        </div>
        <div className="col-lg-4 mb-4 col-12">
          <div className="team-thumb d-flex align-items-center">
            <img
              src="images/persone/kaabouch.jpeg"
              className="img-fluid custom-circle-image team-image me-4"
              alt=""
            />
            <div className="team-info">
              <h5 className="mb-0">kaabouch mohamed</h5>
              {/* Button trigger modal */}
             
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4 col-12">
          <div className="team-thumb d-flex align-items-center">
            <img
              src="images/persone/ait lhaj.jpeg"
              className="img-fluid custom-circle-image team-image me-4"
              alt=""
            />
            <div className="team-info">
              <h5 className="mb-0">ait lhaj abdelilah</h5>
              {/* Button trigger modal */}
            
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-lg-0 mb-4 col-12">
          <div className="team-thumb d-flex align-items-center">
            <img
              src="images/persone/hiba.jpeg"
              className="img-fluid custom-circle-image team-image me-4"
              alt=""
            />
            <div className="team-info">
              <h5 className="mb-0">douik hiba</h5>
              {/* Button trigger modal */}

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
            Let   <span>READ</span> ME
          </h2>
          <div className="slick-testimonial">
            <div className="slick-testimonial-caption">
              <p className="lead">
              A book is a medium for recording information in the form of writing or images. Modern books are typically in codex format, composed of many pages that are bound together and protected by a cover; they were preceded by several earlier formats, including the scroll and the tablet. The book publishing process is the series of steps involved in their creation and dissemination.

As a conceptual object, a book refers to a written work of substantial length, which may be distributed either physically or digitally as an ebook. These works can be broadly classified into fiction (containing invented content, often narratives) and non-fiction (containing content intended as factual truth). A physical book may not contain such a work: for example, it may contain only drawings, engravings, photographs, puzzles, or removable content like paper dolls. It may also be left empty for personal use, as in the case of account books, appointment books, autograph books, notebooks, diaries and sketchbooks.

Books are sold at both regular stores and specialized bookstores, as well as online for delivery, and can be borrowed from libraries. The reception of books has led to a number of social consequences, including censorship.
              </p>
              <div className="slick-testimonial-client d-flex align-items-center mt-4">
                {/* <img
                  src="template_user/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg"
                  className="img-fluid custom-circle-image me-3"
                  alt=""
                /> */}
                {/* <span>
                  George,{" "}
                  <strong className="text-muted">Digital Art Fashion</strong>
                </span> */}
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