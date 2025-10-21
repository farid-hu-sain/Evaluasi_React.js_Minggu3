import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Cannot load product");
        return res.json();
      })
      .then(setProduct)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const styles = {
    container: {
      display: "flex",
      gap: "40px",
      padding: "40px",
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0, 51, 102, 0.08)",
    },
    image: {
      width: "300px",
      height: "300px",
      objectFit: "contain",
      border: "1px solid #e0eaff",
      borderRadius: "8px",
      padding: "10px",
      flexShrink: 0,
    },
    details: {
      flex: 1,
    },
    title: {
      color: "#003366",
      marginBottom: "15px",
      fontSize: "2rem",
    },
    description: {
      color: "#555",
      lineHeight: 1.6,
      marginBottom: "20px",
    },
    price: {
      color: "#007bff",
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "25px",
    },
    button: {
      padding: "12px 25px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.1s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "translateY(-1px)",
    },
    loading: { textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "#003366" },
    error: { textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "red" },
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;
  if (!product) return null;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <div style={styles.details}>
        <h2 style={styles.title}>{product.title}</h2>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${product.price}</p>
        <button
          onClick={() => addItem({ id: product.id, title: product.title, price: product.price, image: product.image })}
          style={styles.button}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}