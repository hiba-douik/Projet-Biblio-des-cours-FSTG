import React from 'react'
import Footer from '../components/Users/layouts/Footer'
import Navbar from '../components/Users/layouts/Navbar'

function Home() {
  return (
    <div>
    <section className="preloader">
    <div className="spinner">
      <span className="sk-inner-circle" />
    </div>
  </section>
  <main>
    <Navbar/>
    <section className="slick-slideshow">
      <div className="slick-custom">
        <img
          src="template_user/images/slideshow/medium-shot-business-women-high-five.jpeg"
          className="img-fluid"
          alt=""
        />
        <div className="slick-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-10">
                    <h1 className="slick-title">Welcome to Read Me</h1>
                    <p className="lead text-white mt-lg-3 mb-lg-5">
                      Access and download all the files shared with you, consult your courses, assignments, and practical work for academic success.
                    </p>
                    <a href="/about" className="btn custom-btn">
                      Learn more about Read Me
                    </a>
                  </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="slick-custom">
        <img
          src="template_user/images/slideshow/team-meeting-renewable-energy-project.jpeg"
          className="img-fluid"
          alt=""
        />
        <div className="slick-bottom">
          <div className="container">
            <div className="row">
            <div className="col-lg-6 col-10">
                    <h1 className="slick-title">Access Your Resources</h1>
                    <p className="lead text-white mt-lg-3 mb-lg-5">
                      Download shared files, check out your courses, and prepare with practice materials.
                    </p>
                    <a href="/files" className="btn custom-btn">
                      Explore Files
                    </a>
                  </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slick-custom">
        <img
          src="template_user/images/slideshow/two-business-partners-working-together-office-computer.jpeg"
          className="img-fluid"
          alt=""
        />
        <div className="slick-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-10">
                <h1 className="slick-title">Talk to us</h1>
                <p className="lead text-white mt-lg-3 mb-lg-5">
                  Tooplate is one of the best HTML CSS template websites for
                  everyone.
                </p>
                <a href="contact.html" className="btn custom-btn">
                  Work with us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
    <section className="about section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
          <h2 className="mb-5">
                  Get started with <span>Read Me</span>
                </h2>
          </div>
          <div className="col-lg-2 col-12 mt-auto mb-auto">
            <ul
              className="nav nav-pills mb-5 mx-auto justify-content-center align-items-center"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Introduction
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-youtube-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-youtube"
                  type="button"
                  role="tab"
                  aria-controls="pills-youtube"
                  aria-selected="true"
                >
                  How we work?
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-skill-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-skill"
                  type="button"
                  role="tab"
                  aria-controls="pills-skill"
                  aria-selected="false"
                >
                  Capabilites
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-10 col-12">
            <div className="tab-content mt-2" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row">
                  <div className="col-lg-7 col-12">
                    <img
                      src="template_user/images/pim-chu-z6NZ76_UTDI-unsplash.jpeg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-5 col-12">
                   <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                  <h4 className="mb-3">
                    Share and Download Files Easily
                  </h4>
                  <p>
                    With Read Me, users can upload and share resources with students, consult files, and download all necessary materials for academic success.
                  </p>
                  <div className="mt-2 mt-lg-auto">
                    <a href="/about" className="custom-link mb-2">
                      Learn more about our platform
                      <i className="bi-arrow-right ms-2" />
                    </a>
                  </div>
                </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-youtube"
                role="tabpanel"
                aria-labelledby="pills-youtube-tab"
              >
                <div className="row">
                  <div className="col-lg-7 col-12">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/f_7JqPDWhfw?controls=0"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-5 col-12">
                    <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                      <h4 className="mb-3">ON READ ME</h4>
                      <p>
                      On ReadMe, our platform is designed to make academic resources easily accessible for students. Users can download shared files such as lecture notes, assignments, and practical work files directly from the site. Our organized content includes courses, homework, and lab exercises, all aimed at helping you succeed. With a simple and intuitive interface, you can browse, download, and access all necessary materials efficiently. The platform empowers students to stay on track, 
                      </p>
                      <p>complete tasks, and enhance their learning experience in one place.</p>
                      <div className="mt-2 mt-lg-auto">
                        <a href="contact.html" className="custom-link mb-2">
                          Work with us
                          <i className="bi-arrow-right ms-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-skill"
                role="tabpanel"
                aria-labelledby="pills-skill-tab"
              >
                <div className="row">
                  <div className="col-lg-7 col-12">
                    <img
                      src="template_user/images/cody-lannom-G95AReIh_Ko-unsplash.jpeg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-5 col-12">
  <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
    <h4 className="mb-3">How Can Our Library Assist You?</h4>
    <p>
      With years of service, we’ve supported countless patrons with a variety of learning resources and tools to enhance their knowledge and research.
    </p>
    <div className="skill-thumb mt-3">
      <strong>Book Collection</strong>
      <span className="float-end">95%</span>
      <div className="progress">
        <div
          className="progress-bar progress-bar-primary"
          role="progressbar"
          aria-valuenow={95}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: "95%" }}
        />
      </div>
      <strong>Research Support</strong>
      <span className="float-end">85%</span>
      <div className="progress">
        <div
          className="progress-bar progress-bar-primary"
          role="progressbar"
          aria-valuenow={85}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: "85%" }}
        />
      </div>
      <strong>Online Resources</strong>
      <span className="float-end">90%</span>
      <div className="progress">
        <div
          className="progress-bar progress-bar-primary"
          role="progressbar"
          aria-valuenow={90}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: "90%" }}
        />
      </div>
    </div>
    <div className="mt-2 mt-lg-auto">
      <a href="library-catalog.html" className="custom-link mb-2">
        Explore Our Collection
        <i className="bi-arrow-right ms-2" />
      </a>
    </div>
  </div>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="front-product">
      <div className="container-fluid p-0">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            <img
              src="template_user/images/retail-shop-owner-mask-social-distancing-shopping.jpg"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-6 col-12">
          <div className="px-5 py-5 py-lg-0">
  <h2 className="mb-4">
    <span>Library</span> Users
  </h2>
  <p className="lead mb-4">
    We extend our thanks to various online repositories and academic resources for the materials available in our library collection, enhancing the learning experience for our users.
  </p>
  <a href="library-resources.html" className="custom-link">
    Explore Library Resources
    <i className="bi-arrow-right ms-2" />
  </a>
</div>

          </div>
        </div>
      </div>
    </section>
    <section className="featured-product section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="mb-5">Featured Files</h2>
          </div>
          
          <div className="col-lg-4 col-12 mb-3">
            <div className="product-thumb">
              <a href="product-detail.html">
                <img
                  src="template_user/images/product/evan-mcdougall-qnh1odlqOmk-unsplash.jpeg"
                  className="img-fluid product-image"
                  alt=""
                />
              </a>
              <div className="product-top d-flex">
                <span className="product-alert me-auto">Course File</span>
                <a href="#" className="bi-heart-fill product-icon" />
              </div>
              <div className="product-info d-flex">
                <div>
                  <h5 className="product-title mb-0">
                    <a
                      href="product-detail.html"
                      className="product-title-link"
                    >
                      full content of a subject or module,
                    </a>
                  </h5>
                  <p className="product-p">
                  including lessons, lectures, and reading materials. It serves as a comprehensive guide for students throughout the course                  </p>
                </div>
                <small className="product-price text-muted ms-auto mt-auto mb-5">
                  $25
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 mb-3">
            <div className="product-thumb">
              <a href="product-detail.html">
                <img
                  src="template_user/images/product/jordan-nix-CkCUvwMXAac-unsplash.jpeg"
                  className="img-fluid product-image"
                  alt=""
                />
              </a>
              <div className="product-top d-flex">
                <span className="product-alert">Travaux Pratiques (Practical Work)                </span>
                <a href="#" className="bi-heart-fill product-icon ms-auto" />
              </div>
              <div className="product-info d-flex">
                <div>
                  <h5 className="product-title mb-0">
                    <a
                      href="product-detail.html"
                      className="product-title-link"
                    >
                      A file that includes hands-on exercises, lab reports, and projects
                    </a>
                  </h5>
                  <p className="product-p">help students apply theoretical knowledge in real-world scenarios. It emphasizes problem-solving and</p>
                </div>
                <small className="product-price text-muted ms-auto mt-auto mb-5">
                  $35
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 mb-3">
            <div className="product-thumb">
              <a href="product-detail.html">
                <img
                  src="template_user/images/product/jordan-nix-CkCUvwMXAac-unsplash.jpeg"
                  className="img-fluid product-image"
                  alt=""
                />
              </a>
              <div className="product-top d-flex">
                <span className="product-alert">Resume             </span>
                <a href="#" className="bi-heart-fill product-icon ms-auto" />
              </div>
              <div className="product-info d-flex">
                <div>
                  <h5 className="product-title mb-0">
                    <a
                      href="product-detail.html"
                      className="product-title-link"
                    >
                      summary document that provides an overview of the key point
                    </a>
                  </h5>
                  <p className="product-p">summary document that provides an overview of the key point</p>
                </div>
                <small className="product-price text-muted ms-auto mt-auto mb-5">
                  $35
                </small>
              </div>
            </div>
          </div>
        
          <div className="col-12 text-center">
            <a href="products.html" className="view-all">
              View All Products
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer/>
  </div>
  )
}

export default Home