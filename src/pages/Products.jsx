import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = useCallback(product => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  }, [addItem]);

  const styles = {
    loading: { textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "#003366" },
    error: { textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "red" },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
      gap: "25px",
      padding: "30px",
      backgroundColor: "#f7f9ff", 
    },
    link: {
      display: "block",
      textAlign: "center",
      marginTop: "10px",
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#0056b3",
      textDecoration: "underline",
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      {products.map(p => (
        <div key={p.id}>
          <ProductCard product={p} onAdd={handleAdd} />
          <Link
            to={`/products/${p.id}`}
            style={styles.link}
            onMouseEnter={e => e.currentTarget.style = { ...styles.link, ...styles.linkHover }}
            onMouseLeave={e => e.currentTarget.style = styles.link}
          >
            Detail
          </Link>
        </div>
      ))}
    </div>
  );
}