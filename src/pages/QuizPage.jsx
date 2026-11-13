import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnswerOption from "../components/AnswerOption.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import questions from "../data/questions.js";

function QuizPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [notice, setNotice] = useState("");
  const question = questions[currentIndex];
  const selectedAnswer = answers[question.id];
  const answeredCount = Object.keys(answers).length;

  function selectAnswer(answer) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [question.id]: answer,
    }));
    setNotice("");
  }

  function goNext() {
    if (selectedAnswer === undefined) {
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      setNotice("");
      return;
    }

    const unansweredIndex = questions.findIndex(
      (item) => answers[item.id] === undefined,
    );
    if (unansweredIndex !== -1) {
      setCurrentIndex(unansweredIndex);
      setNotice("Answer every question before viewing your results.");
      return;
    }

    navigate("/result", { state: { answers } });
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
      setNotice("");
    }
  }

  return (
    <div className="quiz-page">
      <div className="page-heading-row">
        <div>
          <Link className="back-link" to="/"><span aria-hidden="true">←</span> Exit quiz</Link>
          <h1>Let&apos;s see what you know.</h1>
        </div>
        <span className="time-chip"><span aria-hidden="true">✦</span> TAKE YOUR TIME</span>
      </div>

      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        answered={answeredCount}
      />

      <QuestionCard
        question={question}
        questionNumber={currentIndex + 1}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={selectAnswer}
      />

      {notice && <p className="quiz-notice" role="status">{notice}</p>}

      <div className="quiz-navigation">
        <button
          className="button button-secondary"
          type="button"
          disabled={currentIndex === 0}
          onClick={goPrevious}
        >
          <span aria-hidden="true">←</span> Previous
        </button>
        <span className="navigation-count">
          {String(currentIndex + 1).padStart(2, "0")}
          <span> / {String(questions.length).padStart(2, "0")}</span>
        </span>
        <button
          className="button button-primary"
          type="button"
          disabled={selectedAnswer === undefined}
          onClick={goNext}
        >
          {currentIndex === questions.length - 1 ? "View results" : "Next question"}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="sr-only" aria-live="polite">
        {selectedAnswer !== undefined && `Answer selected: ${selectedAnswer}`}
      </div>
    </div>
  );
}

export default QuizPage;
