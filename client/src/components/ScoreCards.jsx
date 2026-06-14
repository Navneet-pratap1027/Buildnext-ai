import React from 'react';
import './ScoreCards.css';

function scoreColor(score) {
  if (score >= 75) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function ScoreRing({ score, label, sub }) {
  const color = scoreColor(score);

  const r = 42;
  const cx = 50;
  const cy = 50;

  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;

  return (
    <div className="score-card">

      <div className="ring-wrap">

        <svg
          width="110"
          height="110"
          viewBox="0 0 100 100"
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,.08)"
            strokeWidth="8"
          />

          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div
          className="ring-score"
          style={{ color }}
        >
          {score}
        </div>

      </div>

      <div className="score-label">
        {label}
      </div>

      <div className="score-sub">
        {sub}
      </div>

    </div>
  );
}

export default function ScoreCards({
  analysis,
  repoCount
}) {
  return (
    <div className="scores-grid">

      <ScoreRing
        score={analysis.githubScore}
        label="GitHub Score"
        sub="Overall Quality"
      />

      <ScoreRing
        score={analysis.uniquenessScore}
        label="Uniqueness"
        sub="Market Comparison"
      />

      <div className="score-card score-plain">
        <div className="plain-number">
          {repoCount}
        </div>

        <div className="score-label">
          Public Repositories
        </div>

        <div className="score-sub">
          Analyzed
        </div>
      </div>

      <div className="score-card score-plain">
        <div className="plain-number overused">
          {analysis.overusedScore}%
        </div>

        <div className="score-label">
          Overused Score
        </div>

        <div className="score-sub">
          Portfolio Saturation
        </div>
      </div>

    </div>
  );
}