import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">

      <div className="container">

        <section className="about-hero">

          <div className="about-badge">
            About BuildNext AI
          </div>

          <h1 className="about-title">
            Transforming GitHub Into
            <span> Career Intelligence</span>
          </h1>

          <p className="about-subtitle">
            BuildNext AI helps developers understand
            where they stand, what skills they are
            missing, and what projects they should
            build next to maximize career growth.
          </p>

        </section>

        <section className="about-grid">

          <div className="about-card glass-card">
            <h3>Our Mission</h3>

            <p>
              Most developers build projects blindly.
              We help developers make data-driven
              decisions about what to learn and
              build next.
            </p>
          </div>

          <div className="about-card glass-card">
            <h3>AI Powered</h3>

            <p>
              Using GitHub analysis and AI insights,
              BuildNext AI identifies portfolio gaps
              and recommends high-impact projects.
            </p>
          </div>

          <div className="about-card glass-card">
            <h3>Career Focused</h3>

            <p>
              Every recommendation is designed to
              improve employability, portfolio value,
              and real-world relevance.
            </p>
          </div>

        </section>

        <section className="about-stats">

          <div className="stat-card glass-card">
            <h2>10K+</h2>
            <span>Profiles Analyzed</span>
          </div>

          <div className="stat-card glass-card">
            <h2>92%</h2>
            <span>Insight Accuracy</span>
          </div>

          <div className="stat-card glass-card">
            <h2>500+</h2>
            <span>Project Suggestions</span>
          </div>

        </section>

      </div>

    </div>
  );
}