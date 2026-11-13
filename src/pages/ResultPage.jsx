import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard.jsx";
import questions from "../data/questions.js";

function ResultPage() {
  const location = useLocation();
  const answers = location.state?.answers;

  if (!answers) {
    return <Navigate to="/" replace />;
  }

  const correct = questions.reduce(
    (score, question) => score + (answers[question.id] === question.answer ? 1 : 0),
    0,
  );

  return <ResultCard correct={correct} total={questions.length} />;
}

export default ResultPage;
