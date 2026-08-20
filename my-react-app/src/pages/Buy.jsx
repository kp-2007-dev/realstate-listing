import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Buy.css";
import { propertyTypes, propertyCategories } from "../data/propertyOptions";
import { useProperties } from "../context/PropertyContext";

const getType = (id) => propertyTypes[id % propertyTypes.length];
const getCategory = (id) => propertyCategories[id % propertyCategories.length];
const getPrice = (id) => `$${(150 + (id % 50) * 8).toLocaleString()},000`;
const locations = [
  "Austin, Texas", "Lisbon, Portugal", "Berlin, Germany", "Toronto, Canada",
  "Kathmandu, Nepal", "Brooklyn, New York", "Boulder, Colorado", "Chicago, Illinois",
];
const getLocation = (id) => locations[id % locations.length];

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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const { userProperties } = useProperties();

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
          contactEmail: "listings@tobelong.com",
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

  const allProperties = [...userProperties, ...properties];

  const filteredProperties = allProperties.filter((p) => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.type);
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return typeMatch && categoryMatch;
  });

  const activeFilterCount = selectedTypes.length + selectedCategories.length;

  return (
    <div className="buy-page">
      <div className="buy-topbar">
        <Link to="/" className="back-link">
          &#8592; Back to Properties
        </Link>
      </div>

      <div className="buy-content">
        <div className="buy-header-row">
          <div>
            <h1>Find Your Next Property</h1>
            {!loading && !error && (
              <p className="results-count">{filteredProperties.length} properties found</p>
            )}
          </div>

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <h3>Property Type</h3>
              <div className="filter-options">
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
            </div>

            <div className="filter-group">
              <h3>Property Category</h3>
              <div className="filter-options">
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
            </div>

            {activeFilterCount > 0 && (
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedCategories([]);
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        <main className="buy-gallery">
          {loading && <p className="results-count">Loading properties...</p>}
          {error && <p className="no-results">Error: {error}</p>}

          {!loading && !error && (
            <>
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
                        <button
                          className="view-btn"
                          onClick={() => setSelectedProperty(p)}
                        >
                          View Details
                        </button>
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

      {selectedProperty && (
        <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProperty(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <div
              className="modal-img"
              style={{ backgroundImage: `url(${selectedProperty.img})` }}
            >
              <span className="property-tag">{selectedProperty.type}</span>
            </div>

            <div className="modal-body">
              <h2>{selectedProperty.title}</h2>
              <p className="modal-location">{selectedProperty.location}</p>

              <div className="modal-meta">
                <span><strong>Type:</strong> {selectedProperty.type}</span>
                <span><strong>Category:</strong> {selectedProperty.category}</span>
              </div>

              <p className="modal-price">{selectedProperty.price}</p>
              <p className="modal-desc">{selectedProperty.desc}</p>

              <div className="modal-contact">
                <h4>Interested in this property?</h4>
                <p>
                  Contact the seller at{" "}
                  <a href={`mailto:${selectedProperty.contactEmail || "listings@tobelong.com"}`}>
                    {selectedProperty.contactEmail || "listings@tobelong.com"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}