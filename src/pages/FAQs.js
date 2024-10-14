import React from 'react'
import Navbar from '../components/Users/layouts/Navbar'
import Footer from '../components/Users/layouts/Footer'

function FAQs() {
  return (
    <div>
        <Navbar/> 
          <header className="site-header section-padding d-flex justify-content-center align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-12">
          <h1>
            <span className="d-block text-primary">
              Your favorite questions
            </span>
            <span className="d-block text-dark">and our answers to them</span>
          </h1>
        </div>
      </div>
    </div>
  </header>
  <section className="faq section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-12">
          <h2>General Info.</h2>
          <div className="accordion" id="accordionGeneral">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordionGeneralOne"
                  aria-expanded="true"
                  aria-controls="accordionGeneralOne"
                >
                  What is this Little Fashion?
                </button>
              </h2>
              <div
                id="accordionGeneralOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionGeneral"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                    <strong>Little Fashion</strong> is free Bootstrap 5 website
                    template for everyone. There are 8 HTML pages included in
                    this template and you can expand more pages as you need.
                  </p>
                  <p className="large-paragraph">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordionGeneralTwo"
                  aria-expanded="false"
                  aria-controls="accordionGeneralTwo"
                >
                  What is Tooplate website?
                </button>
              </h2>
              <div
                id="accordionGeneralTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionGeneral"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                    <a
                      href="https://www.tooplate.com/free-templates"
                      target="_blank"
                    >
                      Tooplate
                    </a>{" "}
                    is a great website to download free HTML website templates
                    for your business or personal use. Tooplate website has been
                    online for almost 8 years now. Thank you for visiting our
                    website.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordionGeneralThree"
                  aria-expanded="false"
                  aria-controls="accordionGeneralThree"
                >
                  How do I support your website?
                </button>
              </h2>
              <div
                id="accordionGeneralThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionGeneral"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                    You can support our Tooplate website by sharing it to your
                    friends or colleagues on the web or social media.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-5">
            About <span>our products</span>
          </h2>
          <div className="accordion" id="accordionProduct">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordionProductOne"
                  aria-expanded="true"
                  aria-controls="accordionProductOne"
                >
                  What is Fashion Design?
                </button>
              </h2>
              <div
                id="accordionProductOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionProduct"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                    <strong>Lorem ipsum dolor</strong> sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Quis ipsum suspendisse ultrices
                    gravida. Risus commodo viverra maecenas accumsan lacus vel
                    facilisis.
                  </p>
                  <p className="large-paragraph">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordionProductTwo"
                  aria-expanded="false"
                  aria-controls="accordionProductTwo"
                >
                  How do I use the product?
                </button>
              </h2>
              <div
                id="accordionProductTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionProduct"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups.
                  </p>
                </div>
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

export default FAQs