import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
        role: "USER",
      });
      alert("Signup successful");
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚌 BusBook</h2>
        <p style={styles.subtitle}>Create your account</p>

        <form onSubmit={handleSignup}>
          <input
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Sign Up
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#2C3333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#395B64",
    padding: "36px 40px",
    borderRadius: 18,
    width: 380,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  title: {
    color: "#E7F6F2",
    marginBottom: 6,
  },
  subtitle: {
    color: "#A5C9CA",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 16,
    borderRadius: 10,
    border: "none",
    fontSize: 14,
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#A5C9CA",
    border: "none",
    borderRadius: 12,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    color: "#E7F6F2",
    fontSize: 14,
  },
  link: {
    color: "#A5C9CA",
    cursor: "pointer",
    fontWeight: 600,
  },
};
