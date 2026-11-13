import React, { useState } from "react";

function ContentRating({ title, text }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <article className="content-card" aria-labelledby="content-title">
      <div className="content-card-heading">
        <div>
          <span className="content-kicker">FEATURED READING</span>
          <h2 id="content-title">{title}</h2>
        </div>
        <span className="content-number" aria-hidden="true">01</span>
      </div>

      <div className="content-divider" />
      <p className="content-text">{text}</p>

      <div className="rating-footer">
        <div>
          <span className="rating-prompt">Was this helpful?</span>
          <span className="rating-hint">Your feedback helps us improve.</span>
        </div>
        <div className="rating-buttons">
          <button
            className="rating-button like-button"
            type="button"
            aria-label={`Like, ${likes} likes`}
            onClick={() => setLikes((count) => count + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3Zm0 0 5-7a3 3 0 0 1 2 3v3h4.2a2.5 2.5 0 0 1 2.4 3.2l-1.6 6A2.5 2.5 0 0 1 16.6 20H7" />
            </svg>
            <span>Like ({likes})</span>
          </button>
          <button
            className="rating-button dislike-button"
            type="button"
            aria-label={`Dislike, ${dislikes} dislikes`}
            onClick={() => setDislikes((count) => count + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 14V4H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3Zm0 0 5 7a3 3 0 0 0 2-3v-3h4.2a2.5 2.5 0 0 0 2.4-3.2l-1.6-6A2.5 2.5 0 0 0 16.6 4H7" />
            </svg>
            <span>Dislike ({dislikes})</span>
          </button>
        </div>
      </div>
      <div className="sr-only" aria-live="polite">
        {likes} likes and {dislikes} dislikes
      </div>
    </article>
  );
}

export default ContentRating;
