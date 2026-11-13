import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="welcome-card" aria-labelledby="welcome-title">
      <div className="welcome-orb welcome-orb-one" aria-hidden="true" />
      <div className="welcome-orb welcome-orb-two" aria-hidden="true" />
      <div className="welcome-content">
        <div className="welcome-symbol" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path d="M16 3 19.2 12.8 29 16l-9.8 3.2L16 29l-3.2-9.8L3 16l9.8-3.2L16 3Z" />
          </svg>
        </div>
        <span className="welcome-kicker">10 QUESTIONS · INSTANT FEEDBACK</span>
        <h1 id="welcome-title">Welcome to the<br /><span>Frontend Quiz!</span></h1>
        <p>
          A quick, friendly challenge on the JavaScript fundamentals every
          frontend developer should know.
        </p>
        <Link className="button button-primary start-button" to="/quiz">
          Start quiz <span aria-hidden="true">→</span>
        </Link>
        <div className="welcome-footer">
          <span><span className="mini-check" aria-hidden="true">✓</span> 10 multiple-choice questions</span>
          <span><span className="mini-check" aria-hidden="true">✓</span> Your score at the end</span>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
