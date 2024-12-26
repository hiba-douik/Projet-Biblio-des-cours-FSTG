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
                  Quel est l'objectif de la bibliothèque ?

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
                  favoriser l'accès et la recherche dans leurs collections. promouvoir la pratique de la lecture et la recherche documentaire dans l'enseignement, et mener des actions de formation des utilisateurs. 
                  </p>
                  <p className="large-paragraph">
                  affirmer leur fonction culturelle et leur rôle patrimonial.
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
Quelle est la mission d'une bibliothèque ?                </button>
              </h2>
              <div
                id="accordionGeneralTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionGeneral"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                  La bibliothèque constitue en effet un lieu favorable à la sensibilisation et à la formation au numérique des publics les plus divers, par la diffusion d'un socle commun de connaissances numériques susceptibles de faciliter la vie personnelle et professionnelle de chacun.
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
Quelles sont les fonctions de la bibliothèque ?                </button>
              </h2>
              <div
                id="accordionGeneralThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionGeneral"
              >
                <div className="accordion-body">
                  <p className="large-paragraph">
                  Aujourd'hui les bibliothèques, médiathèques municipales et ne se limitent plus à leurs fonctions de prêts de livres et de lieux d'étude, mais sont devenues, pour répondre aux nouvelles pratiques de leurs usagers, des espaces de loisir, d'animation culturelle et de partages de savoirs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-5">
            About <span>READ ME</span>
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
                  Comment appelle-t-on les rayons d'une bibliothèque ?
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
                  Vous vous demandez s'il on parle de rayons, d'étagères ou de rayonnages en ce qui concerne les livres présentés dans une bibliothèque municipale. Rangée de rayonnages. Ensemble de rayons.
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
                  Qui est le père de la bibliothèque ?
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
                  Ptolémée Ier , fondateur de la bibliothèque. En Grèce antique, il n'y a pas de trace de bibliothèque publique avant la création de la bibliothèque d'Alexandrie.
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