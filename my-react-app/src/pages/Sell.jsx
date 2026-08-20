import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { propertyTypes, propertyCategories } from "../data/propertyOptions";
import { useProperties } from "../context/PropertyContext";
import "./Sell.css";

export default function Sell() {
  const navigate = useNavigate();
  const { addProperty } = useProperties();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: propertyTypes[0],
    category: propertyCategories[0],
    description: "",
    contactEmail: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.location || !form.price || !form.contactEmail) {
      setError("Please fill in title, location, price, and contact email.");
      return;
    }

    const newProperty = {
      id: `user-${Date.now()}`,
      title: form.title,
      location: form.location,
      price: form.price.startsWith("$") ? form.price : `$${form.price}`,
      type: form.type,
      category: form.category,
      contactEmail: form.contactEmail,
      desc:
        form.description ||
        "A well-maintained property in a desirable neighborhood, ready for its next owner.",
      img:
        imagePreview ||
        "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
    };

    addProperty(newProperty);
    setError("");
    setSubmitted(true);

    setTimeout(() => {
      navigate("/buy");
    }, 1400);
  };

  return (
    <div className="sell-page">
      <div className="sell-topbar">
        <Link to="/" className="back-link">
          &#8592; Back to Home
        </Link>
      </div>

      <div className="sell-layout">
        <h1>List Your Property</h1>
        <p className="sell-subtitle">
          Fill in the details below and your listing will appear on the Buy page.
        </p>

        {submitted && (
          <div className="success-banner">
            ✅ Your property has been listed! Redirecting to Buy page...
          </div>
        )}

        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="form-row full-width">
            <label>
              Property Title
              <input
                type="text"
                name="title"
                placeholder="e.g. Sunny 2-bedroom apartment"
                value={form.title}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row full-width">
            <label>
              Contact Email
              <input
                type="email"
                name="contactEmail"
                placeholder="e.g. you@example.com"
                value={form.contactEmail}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Location
              <input
                type="text"
                name="location"
                placeholder="e.g. Kathmandu, Nepal"
                value={form.location}
                onChange={handleChange}
              />
            </label>
            <label>
              Asking Price
              <input
                type="text"
                name="price"
                placeholder="e.g. 250,000"
                value={form.price}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Property Type
              <select name="type" value={form.type} onChange={handleChange}>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Property Category
              <select name="category" value={form.category} onChange={handleChange}>
                {propertyCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row full-width">
            <label>
              Description
              <textarea
                name="description"
                rows="4"
                placeholder="Describe the property..."
                value={form.description}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row full-width">
            <label className="upload-label">
              Property Photo
              <div className="upload-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="upload-preview" />
                ) : (
                  <span className="upload-placeholder">Click to upload an image</span>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="submit-btn" disabled={submitted}>
            {submitted ? "Listed! Redirecting..." : "List My Property"}
          </button>
        </form>
      </div>
    </div>
  );
}