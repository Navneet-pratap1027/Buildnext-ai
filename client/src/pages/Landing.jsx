import React, { useState } from 'react';
import './Landing.css';

const LOADING_MSGS = [
  'Scanning repositories...',
  'Analyzing portfolio structure...',
  'Detecting skill gaps...',
  'Comparing with market trends...',
  'Generating AI recommendations...',
];

export default function Landing({ onAnalyze, loading, error }) {
  const [username, setUsername] = useState('');
  const [msgIdx, setMsgIdx] = React.useState(0);

  React.useEffect(() => {
    if (!loading) return;

    const t = setInterval(() => {
      setMsgIdx(i => (i + 1) % LOADING_MSGS.length);
    }, 1200);

    return () => clearInterval(t);
  }, [loading]);

  function handleSubmit(e) {
    e.preventDefault();

    if (username.trim()) {
      onAnalyze(username.trim());
    }
  }

  return (
    <div className="landing">
      <div className="container">

        <div className="landing-inner fade-up">

          <div className="badge">
            ✦ AI Portfolio Intelligence Platform
          </div>

          <h1 className="headline">
            Analyze Your GitHub.
            <br />
            <span className="accent">
              Discover What To Build Next.
            </span>
          </h1>

          <p className="subline">
            Transform your GitHub profile into actionable career insights.
            Detect missing skills, identify overused projects, and receive
            personalized AI-powered recommendations based on current market demand.
          </p>

          {!loading ? (
            <form
              className="search-form"
              onSubmit={handleSubmit}
            >
              <div className="input-wrap glass-card">

                <span className="gh-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </span>

                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="analyze-btn"
                disabled={!username.trim()}
              >
                Analyze Portfolio →
              </button>
            </form>
          ) : (
            <div className="loading-state glass-card">
              <div className="spinner"></div>
              <p className="loading-msg">
                {LOADING_MSGS[msgIdx]}
              </p>
            </div>
          )}

          {error && (
            <p className="error-msg">
              {error}
            </p>
          )}

          <div className="examples">
            <span>Popular profiles:</span>

            {['torvalds', 'gaearon', 'Navneet-pratap1027'].map(
              (u) => (
                <button
                  key={u}
                  className="example-btn"
                  onClick={() => onAnalyze(u)}
                >
                  {u}
                </button>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}