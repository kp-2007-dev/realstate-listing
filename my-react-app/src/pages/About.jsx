import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-topbar">
        <Link to="/" className="back-link">
          &#8592; Back to Home
        </Link>
      </div>

      <div className="about-layout">
        <h1>About ToBelong</h1>
        <p className="about-subtitle">
          A simple, honest way to buy and sell homes.
        </p>

        <div className="about-content">
          <p>
            ToBelong was built on a simple idea: finding a place to live — or
            letting go of one — shouldn't feel complicated. We connect buyers
            with real listings and give sellers a fast, straightforward way
            to reach people looking for exactly what they have to offer.
          </p>
          <p>
            Whether you're searching for your next home or ready to list the
            one you're leaving behind, ToBelong keeps the process clear,
            personal, and free of unnecessary friction.
          </p>
        </div>

        <div className="about-values">
          <div className="value-card">
            <h3>Transparency</h3>
            <p>Clear listings, honest pricing, no hidden surprises.</p>
          </div>
          <div className="value-card">
            <h3>Simplicity</h3>
            <p>List or browse a property in minutes, not days.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Real people, real neighborhoods, real connections.</p>
          </div>
        </div>

        <div className="about-cta">
          <Link to="/buy" className="about-btn about-btn--buy">Browse Properties</Link>
          <Link to="/sell" className="about-btn about-btn--sell">List a Property</Link>
        </div>
      </div>
    </div>
  );
}