import React from 'react';
import './SkillChart.css';

const levelColor = {
  high: '#22c55e',
  mid: '#f59e0b',
  low: '#ef4444'
};

export default function SkillChart({ skills = [] }) {
  if (!skills.length) {
    return (
      <div className="skill-empty">
        No skills found.
      </div>
    );
  }

  return (
    <div className="skill-list glass-card">

      {skills.map((skill, index) => {

        if (typeof skill === 'string') {

          const percentage =
            Math.max(60, 95 - index * 3);

          let level = 'low';

          if (index < 3) level = 'high';
          else if (index < 6) level = 'mid';

          return (
            <div
              key={index}
              className="skill-row"
            >
              <div className="skill-header">

                <span className="skill-name">
                  {skill}
                </span>

                <span
                  className="skill-pct"
                  style={{
                    color: levelColor[level]
                  }}
                >
                  {percentage}%
                </span>

              </div>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${percentage}%`,
                    background:
                      levelColor[level]
                  }}
                />
              </div>
            </div>
          );
        }

        return (
          <div
            key={skill.skill || index}
            className="skill-row"
          >
            <div className="skill-header">

              <span className="skill-name">
                {skill.skill}
              </span>

              <span
                className="skill-pct"
                style={{
                  color:
                    levelColor[skill.level] ||
                    '#22c55e'
                }}
              >
                {skill.percentage || 0}%
              </span>

            </div>

            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width:
                    `${skill.percentage || 0}%`,
                  background:
                    levelColor[skill.level] ||
                    '#22c55e'
                }}
              />
            </div>
          </div>
        );
      })}

    </div>
  );
}