import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Ben 10 API</h2>
        <p className="footer-text">
          © {new Date().getFullYear()} Todos os direitos reservados. Este site é feito por fãs para fãs.
        </p>
      </div>
    </footer>
  );
};

export default Footer
