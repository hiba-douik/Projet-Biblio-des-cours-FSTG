import React from 'react'

function Footer() {
  return (
    <footer className="site-footer py-3 bg-dark text-white">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-3 col-md-6 col-12">
        <h4 className="text-white mb-2">
          <a href="index.html" className="text-decoration-none text-white">READ ME</a>
        </h4>
        <p className="copyright-text text-muted small mb-1">
          © 2024 READ ME. All Rights Reserved.
        </p>
        <p className="copyright-text small mb-0">
          Designed by <a href="https://e-read-me.onrender.com/" target="_blank" className="text-decoration-none text-white">READ ME</a>
        </p>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer