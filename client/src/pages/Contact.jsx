import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">

      <div className="container">

        <section className="contact-hero">

          <div className="contact-badge">
            Get In Touch
          </div>

          <h1 className="contact-title">
            Let's Build Something
            <span> Amazing Together</span>
          </h1>

          <p className="contact-subtitle">
            Have feedback, suggestions, feature requests,
            or collaboration opportunities? I'd love to
            hear from you.
          </p>

        </section>

        <section className="contact-grid">

          <div className="contact-card glass-card">

            <div className="contact-icon">
              📧
            </div>

            <h3>Email</h3>

            <p>
              pratap102718@gmail.com
            </p>

          </div>

          <div className="contact-card glass-card">

            <div className="contact-icon">
              💻
            </div>

            <h3>GitHub</h3>

            <a
              href="https://github.com/Navneet-pratap1027"
              target="_blank"
              rel="noreferrer"
            >
              github.com/Navneet-pratap1027
            </a>

          </div>

          <div className="contact-card glass-card">

            <div className="contact-icon">
              💼
            </div>

            <h3>LinkedIn</h3>

            <a
              href="https://www.linkedin.com/in/navneet-pratap-961519300/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.linkedin.com/in/navneet-pratap-961519300/
            </a>

          </div>

        </section>

        <section className="cta-section glass-card">

          <h2>
            Ready To Improve Your Portfolio?
          </h2>

          <p>
            Analyze your GitHub profile and discover
            what skills, projects, and technologies
            can accelerate your career growth.
          </p>

        </section>

      </div>

    </div>
  );
}