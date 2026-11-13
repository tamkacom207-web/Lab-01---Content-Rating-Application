import React from "react";
import AnswerOption from "./AnswerOption.jsx";

function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
}) {
  const revealed = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === question.answer;

  return (
    <section className="question-card" aria-labelledby={`question-${question.id}`}>
      <div className="question-card-top">
        <span className="eyebrow">QUESTION {String(questionNumber).padStart(2, "0")}</span>
        <span className="question-type">MULTIPLE CHOICE</span>
      </div>
      <h1 id={`question-${question.id}`}>{question.text}</h1>
      <p className="answer-prompt">Choose the best answer.</p>
      <div className="answer-list" role="radiogroup" aria-labelledby={`question-${question.id}`}>
        {question.choices.map((choice, index) => (
          <AnswerOption
            key={choice}
            label={String.fromCharCode(65 + index)}
            text={choice}
            selected={selectedAnswer === choice}
            correct={choice === question.answer}
            revealed={revealed}
            onClick={() => onSelectAnswer(choice)}
          />
        ))}
      </div>
      {revealed && (
        <div className={`answer-feedback${isCorrect ? " is-correct" : " is-incorrect"}`} role="status">
          <span className="feedback-icon" aria-hidden="true">{isCorrect ? "✓" : "!"}</span>
          <div>
            <strong>{isCorrect ? "That's right!" : "Not quite."}</strong>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default QuestionCard;
