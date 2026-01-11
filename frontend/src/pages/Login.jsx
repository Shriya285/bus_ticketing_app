import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.userId);

      if (res.data.role === "ADMIN") navigate("/admin");
      else navigate("/user");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚌 BusBook</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <p style={styles.footer}>
          New user?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/signup")}
          >
            Sign up
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
    width: 360,
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
