import { useNavigate } from "react-router-dom";

export default function Navbar({ active, onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      <div style={styles.container}>
        <h2 style={styles.logo}>🚌 BusBook</h2>

        <div style={styles.links}>
          <button
            onClick={() => navigate("/user")}
            style={active === "buses" ? styles.active : styles.link}
          >
            All Buses
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            style={active === "bookings" ? styles.active : styles.link}
          >
            My Bookings
          </button>

          <button onClick={onLogout} style={styles.logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = {
  nav: {
    background: "#2C3333",
    padding: "15px 0",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",          // 🔥 CENTER NAV CONTENT
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#E7F6F2",
    margin: 0,
  },
  links: {
    display: "flex",
    gap: 25,
    alignItems: "center",
  },
  link: {
    cursor: "pointer",
    opacity: 0.7,
    background: "none",
    border: "none",
    color: "#E7F6F2",
  },
  active: {
    fontWeight: "bold",
    borderBottom: "2px solid #A5C9CA",
    background: "none",
    border: "none",
    color: "#E7F6F2",
  },
  logout: {
    background: "#A5C9CA",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: 6,
    fontWeight: 600,
  },
};
