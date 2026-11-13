import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import QuizHeader from "./components/QuizHeader.jsx";

function App() {
  return (
    <div className="app-shell">
      <QuizHeader />
      <main className="page-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>QUIZLAB <span aria-hidden="true">·</span> Keep learning, one question at a time.</span>
        <span>Frontend Quiz</span>
      </footer>
    </div>
  );
}

export default App;
