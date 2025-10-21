import React from "react";
import useCart from "../hooks/useCart";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleFinish = () => {
    alert(`Terima kasih, ${user?.name}. Pesanan diterima! Total: $${total.toFixed(2)}`);
    navigate("/products");
  };

  const styles = {
    container: {
      padding: "40px",
      maxWidth: "600px",
      margin: "40px auto",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 6px 20px rgba(0, 51, 102, 0.1)",
      borderTop: "5px solid #007bff",
    },
    heading: {
      color: "#003366",
      marginBottom: "20px",
      textAlign: "center",
    },
    userInfo: {
      padding: "15px",
      border: "1px solid #e0eaff",
      borderRadius: "8px",
      marginBottom: "20px",
      backgroundColor: "#f7faff",
      fontWeight: "500",
      color: "#333",
    },
    ul: {
      listStyle: "none",
      padding: 0,
      borderTop: "1px solid #eee",
    },
    li: {
      padding: "10px 0",
      borderBottom: "1px dashed #e0eaff",
      display: "flex",
      justifyContent: "space-between",
      color: "#555",
    },
    total: {
      textAlign: "right",
      padding: "15px 0",
      marginTop: "10px",
      borderTop: "2px solid #007bff",
      color: "#003366",
      fontSize: "1.5rem",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      marginTop: "30px",
      justifyContent: "space-between",
    },
    finishButton: {
      flex: 2,
      padding: "12px 20px",
      backgroundColor: "#28a745", 
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    finishButtonHover: {
      backgroundColor: "#1e7e34",
    },
    logoutButton: {
      flex: 1,
      padding: "12px 20px",
      backgroundColor: "#6c757d", 
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    logoutButtonHover: {
      backgroundColor: "#5a6268",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>
      <p style={styles.userInfo}>Nama: **{user?.name}**</p>
      <ul style={styles.ul}>
        {items.map(i => (
          <li key={i.id} style={styles.li}>
            <span>{i.title} x {i.quantity}</span>
            <span>**${(i.price * i.quantity).toFixed(2)}**</span>
          </li>
        ))}
      </ul>
      <h3 style={styles.total}>Total: ${total.toFixed(2)}</h3>
      <div style={styles.buttonContainer}>
        <button
          onClick={handleFinish}
          style={styles.finishButton}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.finishButtonHover.backgroundColor}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.finishButton.backgroundColor}
        >
          Place Order
        </button>
        <button
          onClick={() => { logout(); navigate("/products"); }}
          style={styles.logoutButton}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.logoutButton.backgroundColor}
        >
          Logout
        </button>
      </div>
    </div>
  );
}