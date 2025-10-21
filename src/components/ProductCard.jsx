import React, { memo } from "react";

const ProductCard = memo(({ product, onAdd }) => {
  const styles = {
    card: {
      border: "1px solid #e0eaff", // Border biru sangat muda
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 51, 102, 0.05)", // Shadow lembut
      textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
    cardHover: { 
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0, 51, 102, 0.1)",
    },
    image: {
      width: "120px",
      height: "120px",
      objectFit: "contain",
      marginBottom: "10px",
    },
    title: {
      color: "#003366",
      fontSize: "1.1rem",
      marginBottom: "8px",
    },
    price: {
      color: "#007bff", 
      fontWeight: "bold",
      marginBottom: "12px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.transform = styles.cardHover.transform;
        e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = styles.card.transition.includes("transform") ? "none" : "";
        e.currentTarget.style.boxShadow = styles.card.boxShadow;
      }}
    >
      <img src={product.image} alt={product.title} style={styles.image} />
      <h4 style={styles.title}>{product.title}</h4>
      <p style={styles.price}>${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        style={styles.button}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      >
        Add to Cart
      </button>
    </div>
  );
});

export default ProductCard;