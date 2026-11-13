import React from "react";
import { Link } from "react-router-dom";

function QuizHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="QuizLab home">
        <span className="brand-mark" aria-hidden="true">Q</span>
        <span>quiz<span className="brand-accent">lab</span></span>
      </Link>
      <span className="header-note">
        <span className="header-note-dot" aria-hidden="true" />
        FRONTEND FUNDAMENTALS
      </span>
    </header>
  );
}

export default QuizHeader;
