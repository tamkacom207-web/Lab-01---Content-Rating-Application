import React from "react";
import ContentRating from "./components/ContentRating.jsx";

const article = {
  title: "Text Content Rating",
  text:
    "Thoughtful interfaces make technology feel simple. A clear layout helps people find what they need, while small details like helpful feedback and consistent controls make every interaction easier. Good design is not only about how a page looks; it is also about how confidently someone can use it. By listening to feedback and improving one detail at a time, teams can build digital experiences that feel welcoming, useful, and accessible to everyone.",
};

function App() {
  return (
    <div className="app-shell">
      <header className="school-header">
        <div className="school-mark" aria-hidden="true">
          <span>CR</span>
          <i />
        </div>
        <p className="school-name">COMPUTER COMMUNICATION DEVELOPMENT INSTITUTE</p>
        <p className="school-location">Rizal St., Sorsogon City</p>
      </header>

      <main className="main-content">
        <div className="lab-label">LAB 01</div>
        <section className="intro">
          <span className="eyebrow">INTERACTIVE REACT COMPONENT</span>
          <h1>Content Rating</h1>
          <p>Read the passage and let the creator know what you think.</p>
        </section>
        <ContentRating title={article.title} text={article.text} />
      </main>

      <footer className="site-footer">
        Built with React <span aria-hidden="true">·</span> Click to share your feedback
      </footer>
    </div>
  );
}

export default App;
