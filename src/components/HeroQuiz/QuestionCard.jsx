import React, { forwardRef } from "react";

const QuestionCard = forwardRef(({ question, options, onSelect }, ref) => {
  return (
    <div ref={ref} className="question-card">
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
});

export default QuestionCard;
