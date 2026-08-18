import { useState, useEffect } from "react";
import "./Home.css";

// Slide images sourced from Unsplash (free to use under the Unsplash License).
const slides = [
  {
    src: "https://images.unsplash.com/photo-1760067537293-6b30141d6a52?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern house with palm trees in Praia do Forte, Brazil",
    credit: "Photo by Alef Morais / Unsplash",
    tag: "For Sale",
    caption: "Sun-soaked modern homes",
  },
  {
    src: "https://images.unsplash.com/photo-1774836435838-2a6e7ef30206?auto=format&fit=crop&w=1600&q=80",
    alt: "Suburban neighborhood with houses and trees at dusk",
    credit: "Photo by Srini Somanchi / Unsplash",
    tag: "New Listing",
    caption: "Quiet streets, close-knit neighborhoods",
  },
  {
    src: "https://images.unsplash.com/photo-1761319914911-71b059a655d8?auto=format&fit=crop&w=1600&q=80",
    alt: "Cozy living room with fireplace and large windows",
    credit: "Photo by Clay Banks / Unsplash",
    tag: "Move-in Ready",
    caption: "Interiors built for slow mornings",
  },
  {
    src: "https://images.unsplash.com/photo-1755735340764-3b077cab0c5c?auto=format&fit=crop&w=1600&q=80",
    alt: "Apartment building exterior with trees and sky",
    credit: "Photo by Anton Ryazanov / Unsplash",
    tag: "Now Leasing",
    caption: "City living, right-sized",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => setCurrent(index);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="home">
      {/* Navigation */}
      <header className="navbar">
        <span className="wordmark">ToBelong</span>
        <nav className="nav-actions">
          <button className="nav-btn nav-btn--buy">Buy</button>
          <button className="nav-btn nav-btn--sell">Sell</button>
        </nav>
      </header>

      {/* Hero / slider */}
      <section className="hero" aria-label="Featured listings">
        <div className="slider">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`slide ${index === current ? "slide--active" : ""}`}
              style={{ backgroundImage: `url(${slide.src})` }}
              role="img"
              aria-label={slide.alt}
            >
              <div className="slide-overlay">
                <span className="slide-tag">{slide.tag}</span>
                <p className="slide-caption">{slide.caption}</p>
                <span className="slide-credit">{slide.credit}</span>
              </div>
            </div>
          ))}

          <button className="slider-arrow slider-arrow--prev" onClick={goPrev} aria-label="Previous slide">
            &#8249;
          </button>
          <button className="slider-arrow slider-arrow--next" onClick={goNext} aria-label="Next slide">
            &#8250;
          </button>

          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === current ? "dot--active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hero-text">
          <h1>Find the place you belong.</h1>
          <p>Browse homes to buy, or list the one you're ready to sell — all in one place.</p>
          <div className="hero-actions">
            <button className="cta cta--buy">Start buying</button>
            <button className="cta cta--sell">Start selling</button>
          </div>
        </div>
      </section>
    </div>
  );
}
