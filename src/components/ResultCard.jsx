import React from "react";
import { Link } from "react-router-dom";

function ResultCard({ correct, total }) {
  const incorrect = total - correct;
  const percentage = Math.round((correct / total) * 100);
  const message =
    percentage === 100
      ? "Perfect score. You know your JavaScript!"
      : percentage >= 70
        ? "Great work. Your frontend knowledge is looking sharp."
        : "Good start. A little practice goes a long way.";

  return (
    <section className="result-card" aria-labelledby="result-title">
      <div className="result-icon" aria-hidden="true">{percentage >= 70 ? "✦" : "↗"}</div>
      <span className="eyebrow">QUIZ COMPLETE</span>
      <h1 id="result-title">Nice work!</h1>
      <p className="result-message">{message}</p>

      <div className="score-summary">
        <div className="score-ring" style={{ "--score-progress": `${percentage}%` }}>
          <div className="score-ring-inner">
            <strong>{correct}<span>/{total}</span></strong>
            <small>correct</small>
          </div>
        </div>
        <div className="score-details">
          <div>
            <span className="score-dot is-correct" />
            <span>Correct answers</span>
            <strong>{correct}</strong>
          </div>
          <div>
            <span className="score-dot is-incorrect" />
            <span>Incorrect answers</span>
            <strong>{incorrect}</strong>
          </div>
          <div>
            <span className="score-dot is-percentage" />
            <span>Final score</span>
            <strong>{percentage}%</strong>
          </div>
        </div>
      </div>

      <div className="result-actions">
        <Link className="button button-primary" to="/quiz">
          Retake quiz <span aria-hidden="true">↻</span>
        </Link>
        <Link className="button button-secondary" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}

export default ResultCard;
