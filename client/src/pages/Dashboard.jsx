import React, { useState } from 'react';
import ScoreCards from '../components/ScoreCards';
import SkillChart from '../components/SkillChart';
import RecommendationCard from '../components/RecommendationCard';
import CategoryTags from '../components/CategoryTags';
import './Dashboard.css';

const TABS = ['Overview', 'Skill Gaps', 'Recommendations'];

export default function Dashboard({ data, onReset }) {
  const [tab, setTab] = useState(0);
  const { profile, analysis } = data;

  return (
    <div className="dashboard">
      <div className="container">

        <header className="dash-header glass-card">

          <div className="profile-row">

            <div className="profile-block">
              <img
                src={profile.avatar}
                alt={profile.username}
                className="avatar"
              />

              <div>
                <div className="profile-name">
                  {profile.name || profile.username}
                </div>

                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-link"
                >
                  @{profile.username}
                </a>
              </div>
            </div>

            <button
              className="reset-btn"
              onClick={onReset}
            >
              New Analysis
            </button>
          </div>

          <p className="summary-text">
            {analysis.summary}
          </p>

        </header>

        <ScoreCards
          analysis={analysis}
          repoCount={data.repos.length}
        />

        <div className="tabs glass-card">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`tab-btn ${
                tab === i ? 'active' : ''
              }`}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div className="panel fade-up">

            <div className="section-label">
              Portfolio Categories
            </div>

            <CategoryTags
              categories={analysis.categories}
            />

            <div className="missing-section">

              <div
                className="section-label"
                style={{ marginTop: '2rem' }}
              >
                Missing Opportunities
              </div>

              <div className="missing-grid">
                {analysis.missingSkills.map(skill => (
                  <div
                    key={skill}
                    className="missing-item"
                  >
                    <span className="missing-dot" />
                    {skill}
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="panel fade-up">

            <div className="section-label">
              Skill Coverage Analysis
            </div>

            <SkillChart
              skills={analysis.skillCoverage}
            />
          </div>
        )}

        {tab === 2 && (
          <div className="panel fade-up">

            <div className="section-label">
              AI Project Recommendations
            </div>

            {analysis.recommendations.map(
              (rec, i) => (
                <RecommendationCard
                  key={i}
                  rec={rec}
                  rank={i + 1}
                />
              )
            )}
          </div>
        )}

      </div>
    </div>
  );
}