import React from "react";

const QuestionCard = ({ question, options, onSelect }) => {
  return (
    <div className="question-card">
      <h2 className="question-title">{question}</h2>
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.value}
            className="option-btn"
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
