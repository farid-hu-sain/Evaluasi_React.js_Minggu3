import React from "react";
import useCart from "../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Cart() {
  const { items, removeItem, total, totalCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const styles = {
    container: {
      padding: "30px",
      maxWidth: "800px",
      margin: "20px auto",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 51, 102, 0.05)",
    },
    heading: {
      color: "#003366",
      borderBottom: "2px solid #e0eaff",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    empty: {
      textAlign: "center",
      color: "#555",
      padding: "40px",
      fontSize: "1.1rem",
    },
    ul: {
      listStyle: "none",
      padding: 0,
    },
    li: {
      display: "flex",
      gap: "20px",
      marginBottom: "15px",
      paddingBottom: "15px",
      borderBottom: "1px solid #f0f8ff",
      alignItems: "center",
    },
    image: {
      width: "80px",
      height: "80px",
      objectFit: "contain",
      border: "1px solid #eee",
      borderRadius: "6px",
    },
    itemDetails: {
      flex: 1,
    },
    itemTitle: {
      fontWeight: "bold",
      color: "#333",
      marginBottom: "4px",
    },
    itemPrice: {
      color: "#555",
      fontSize: "0.95rem",
      marginBottom: "8px",
    },
    removeButton: {
      padding: "5px 10px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      fontSize: "0.85rem",
    },
    removeButtonHover: {
      backgroundColor: "#c82333",
    },
    total: {
      textAlign: "right",
      paddingTop: "20px",
      marginTop: "20px",
      borderTop: "2px solid #007bff",
      color: "#003366",
    },
    checkoutButton: {
      display: "block",
      width: "100%",
      padding: "12px",
      backgroundColor: "#28a745",
      color: "white",
      textAlign: "center",
      textDecoration: "none",
      borderRadius: "8px",
      marginTop: "20px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    checkoutButtonHover: {
      backgroundColor: "#1e7e34",
    },
  };

  const handleCheckout = (e) => {
    e.preventDefault(); // Mencegah navigasi default dari <Link>
    if (user) {
      navigate("/checkout"); // Jika sudah login, lanjutkan ke checkout
    } else {
      window.alert("kamu harus login terlebih dahulu!!!");
      navigate("/login", { state: { from: { pathname: "/checkout" } } }); // Arahkan ke login
    }
  };

  // Fungsi konfirmasi sebelum hapus
  const handleRemove = (id, title) => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus "${title}" dari keranjang?`
    );
    if (confirmDelete) {
      removeItem(id);
      window.alert(`"${title}" telah dihapus dari keranjang.`);
    } else {
      window.alert(`"${title}" batal dihapus.`);
    }
  };

  if (!items.length)
    return <p style={styles.empty}>Keranjang kosong 😥</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Cart ({totalCount} items)</h2>
      <ul style={styles.ul}>
        {items.map((item) => (
          <li key={item.id} style={styles.li}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.itemDetails}>
              <div style={styles.itemTitle}>{item.title}</div>
              <div style={styles.itemPrice}>
                ${item.price} × {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => handleRemove(item.id, item.title)}
                style={styles.removeButton}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.removeButtonHover.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.removeButton.backgroundColor)
                }
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 style={styles.total}>Total: ${total.toFixed(2)}</h3>
      <Link
        to="/checkout"
        onClick={handleCheckout}
        style={styles.checkoutButton}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.checkoutButtonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.checkoutButton.backgroundColor)
        }
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
