import { createContext, useContext, useState, useEffect } from "react";

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [userProperties, setUserProperties] = useState(() => {
    try {
      const saved = localStorage.getItem("userProperties");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("userProperties", JSON.stringify(userProperties));
  }, [userProperties]);

  const addProperty = (property) => {
    setUserProperties((prev) => [property, ...prev]);
  };

  return (
    <PropertyContext.Provider value={{ userProperties, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  return useContext(PropertyContext);
}