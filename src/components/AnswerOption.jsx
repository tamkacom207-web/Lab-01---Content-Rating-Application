import React from "react";

function AnswerOption({ label, text, selected, correct, revealed, onClick }) {
  let stateClass = "";
  if (revealed && correct) {
    stateClass = " is-correct";
  } else if (selected) {
    stateClass = revealed ? " is-incorrect" : " is-selected";
  }

  return (
    <button
      className={`answer-option${stateClass}`}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
    >
      <span className="option-letter">{label}</span>
      <span className="option-text">{text}</span>
      <span className="option-indicator" aria-hidden="true">
        {revealed && correct ? "✓" : selected ? "•" : ""}
      </span>
    </button>
  );
}

export default AnswerOption;
