import React from "react";

function ProgressBar({ current, total, answered }) {
  const progress = Math.round((answered / total) * 100);

  return (
    <div className="progress-section">
      <div className="progress-copy">
        <span>{answered} of {total} answered</span>
        <span>{progress}% complete</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Quiz completion"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="question-steps" aria-label="Question navigation">
        {Array.from({ length: total }, (_, index) => {
          const questionNumber = index + 1;
          const isAnswered = questionNumber <= answered;
          const isCurrent = questionNumber === current;
          return (
            <span
              className={`question-step${isAnswered ? " is-answered" : ""}${isCurrent ? " is-current" : ""}`}
              key={questionNumber}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Question ${questionNumber}${isAnswered ? ", answered" : ""}${isCurrent ? ", current" : ""}`}
            >
              {String(questionNumber).padStart(2, "0")}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
