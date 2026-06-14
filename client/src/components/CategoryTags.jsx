import React from 'react';
import './CategoryTags.css';

const statusStyle = {
  overused: {
    bg: 'rgba(239,68,68,.12)',
    color: '#ef4444',
    border: 'rgba(239,68,68,.25)'
  },

  average: {
    bg: 'rgba(245,158,11,.12)',
    color: '#f59e0b',
    border: 'rgba(245,158,11,.25)'
  },

  rare: {
    bg: 'rgba(34,197,94,.12)',
    color: '#22c55e',
    border: 'rgba(34,197,94,.25)'
  }
};

export default function CategoryTags({
  categories
}) {
  return (
    <div className="tags-wrap">

      {categories.map(cat => {

        const s =
          statusStyle[cat.status] ||
          statusStyle.average;

        return (
          <span
            key={cat.name}
            className="cat-tag"
            style={{
              background: s.bg,
              color: s.color,
              borderColor: s.border
            }}
          >
            {cat.name}

            <span className="cat-status">
              {cat.status}
            </span>
          </span>
        );
      })}

    </div>
  );
}