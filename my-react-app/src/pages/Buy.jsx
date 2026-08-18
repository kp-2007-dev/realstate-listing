import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Buy.css";


const propertyTypes = ["Land", "Flat", "Business", "Housing", "Rental", "House", "Apartment"];
const propertyCategories = ["Commercial", "Semi-Commercial", "Residential"];

// Deterministic helpers so the same photo always maps to the same fake type/price
const getType = (id) => propertyTypes[id % propertyTypes.length];
const getCategory = (id) => propertyCategories[id % propertyCategories.length];
const getPrice = (id) => `$${(150 + (id % 50) * 8).toLocaleString()},000`;
const locations = [
  "Austin, Texas", "Lisbon, Portugal", "Berlin, Germany", "Toronto, Canada",
  "Kathmandu, Nepal", "Brooklyn, New York", "Boulder, Colorado", "Chicago, Illinois",
];
const getLocation = (id) => locations[id % locations.length];

// Real property photos (Unsplash — same domain already used in Home.jsx)
const stockPhotos = [
  "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80",
];
const getPhoto = (id) => stockPhotos[id % stockPhotos.length];

export default function Buy() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=9");
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();

        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title,
          location: getLocation(item.id),
          price: getPrice(item.id),
          type: getType(item.id),
          category: getCategory(item.id),
          img: getPhoto(item.id),
          desc: "A well-maintained property in a desirable neighborhood, ready for its next owner.",
        }));

        setProperties(mapped);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleFilter = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredProperties = properties.filter((p) => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.type);
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return typeMatch && categoryMatch;
  });

  return (
    <div className="buy-page">
      <div className="buy-topbar">
        <Link to="/" className="back-link">
          &#8592; Back to Properties
        </Link>
      </div>

      <div className="buy-layout">
        <aside className="buy-sidebar">
          <div className="filter-group">
            <h3>Property Type</h3>
            {propertyTypes.map((type) => (
              <label key={type} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Property Category</h3>
            {propertyCategories.map((cat) => (
              <label key={cat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                />
                {cat}
              </label>
            ))}
          </div>
        </aside>

        <main className="buy-gallery">
          <h1>Find Your Next Property</h1>

          {loading && <p className="results-count">Loading properties...</p>}
          {error && <p className="no-results">Error: {error}</p>}

          {!loading && !error && (
            <>
              <p className="results-count">{filteredProperties.length} properties found</p>
              <div className="property-grid">
                {filteredProperties.map((p) => (
                  <div className="property-card" key={p.id}>
                    <div
                      className="property-img"
                      style={{ backgroundImage: `url(${p.img})` }}
                      role="img"
                      aria-label={p.title}
                    >
                      <span className="property-tag">{p.type}</span>
                    </div>
                    <div className="property-info">
                      <h3>{p.title}</h3>
                      <p className="property-location">{p.location}</p>
                      <p className="property-desc">{p.desc}</p>
                      <div className="property-footer">
                        <span className="property-price">{p.price}</span>
                        <button className="view-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <p className="no-results">No properties match your filters.</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}