import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState({ name: false, password: false });
  const [btnHover, setBtnHover] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/checkout";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Nama tidak boleh kosong");
      window.alert("Nama tidak boleh kosong");
      return;
    }

    if (!password) {
      setError("Password tidak boleh kosong");
      window.alert("Password tidak boleh kosong");
      return;
    }

    if (password.length < 4) {
      setError("Password minimal 4 karakter");
      window.alert("Password minimal 4 karakter");
      return;
    }

    // Cek kredensial statis sesuai permintaan
    const validUsername = "admin";
    const validPassword = "1234";

    if (name.trim() === validUsername && password === validPassword) {
      // Login berhasil
      window.alert("Login berhasil — selamat datang, " + name.trim() + "!");
      login(name.trim());
      navigate(from, { replace: true });
    } else {
      setError("Username atau password salah");
      window.alert("Username atau password salah. Coba lagi.");
    }
  };

  const styles = {
    authContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f8ff",
      padding: "1rem",
    },
    authCard: {
      backgroundColor: "#ffffff",
      padding: "30px 40px",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0, 51, 102, 0.15)",
      width: "100%",
      maxWidth: "400px",
    },
    heading: {
      textAlign: "center",
      color: "#003366",
      marginBottom: "20px",
      borderBottom: "2px solid #66a3ff",
      paddingBottom: "10px",
    },
    formGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#333333",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #cce0ff",
      boxSizing: "border-box",
      fontSize: "16px",
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    inputFocus: {
      borderColor: "#007bff",
      boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.12)",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.15s, transform 0.08s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "translateY(-1px)",
    },
    errorAlert: {
      color: "#cc0000",
      background: "#ffebeb",
      padding: "0.75rem 1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "0.95rem",
      border: "1px solid #ffcccc",
      fontWeight: 600,
      textAlign: "center",
    },
    hint: {
      fontSize: "0.85rem",
      color: "#666",
      marginTop: "8px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard} role="region" aria-label="Login form">
        <h2 style={styles.heading}>Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Nama
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused((s) => ({ ...s, name: true }))}
              onBlur={() => setFocused((s) => ({ ...s, name: false }))}
              style={{
                ...styles.input,
                ...(focused.name ? styles.inputFocus : {}),
              }}
              autoComplete="username"
              aria-invalid={!!error}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused((s) => ({ ...s, password: true }))}
              onBlur={() => setFocused((s) => ({ ...s, password: false }))}
              style={{
                ...styles.input,
                ...(focused.password ? styles.inputFocus : {}),
              }}
              autoComplete="current-password"
              aria-invalid={!!error}
            />
          </div>

          {error && <div style={styles.errorAlert}>{error}</div>}

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(btnHover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            aria-label="Login button"
          >
            Login
          </button>

          <div style={styles.hint}>
            (Untuk demo: username <strong>admin</strong> / password <strong>1234</strong>)
          </div>
        </form>
      </div>
    </div>
  );
}
