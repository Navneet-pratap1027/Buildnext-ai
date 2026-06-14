import React from 'react';
import './RecommendationCard.css';

const difficultyColor = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

export default function RecommendationCard({ rec, rank }) {
  return (
    <div className="rec-card">

      <div className="rec-header">

        <div className="rec-rank">
          #{rank}
        </div>

        <div className="rec-impact">
          +{rec.impactScore || 0}% Impact
        </div>

      </div>

      <h3 className="rec-title">
        {rec.title || 'Project Recommendation'}
      </h3>

      <p className="rec-reason">
        {rec.reason ||
          'No recommendation details available.'}
      </p>

      <div className="rec-meta">

        <span
          className="rec-difficulty"
          style={{
            color:
              difficultyColor[
                rec.difficulty
              ] || '#94a3b8'
          }}
        >
          ● {rec.difficulty || 'N/A'}
        </span>

        <span className="rec-time">
          ⏱ {rec.timeEstimate || 'N/A'}
        </span>

      </div>

      <div className="rec-tags">
        {(rec.techStack || []).map(
          (tech, index) => (
            <span
              key={index}
              className="tech-tag"
            >
              {tech}
            </span>
          )
        )}
      </div>

    </div>
  );
}