import { useEffect, useState } from "react";
import API from "../api/api";
import CreateBusForm from "../components/CreateBusForm";
import AdminSeatGrid from "../components/AdminSeatGrid";
import ResetBusModal from "../components/ResetBusModal";

export default function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [busBookings, setBusBookings] = useState([]);
  const [busToReset, setBusToReset] = useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch {
      alert("Failed to fetch buses");
    }
  };

  const fetchBusBookings = async (busId) => {
    setBusBookings([]);
    setSelectedBusId(busId);

    try {
      const res = await API.get(`/bookings/bus/${busId}`);
      setBusBookings(res.data);
    } catch {
      alert("Failed to fetch bookings");
    }
  };

  const resetBus = async (id) => {
    try {
      await API.put(`/buses/reset/${id}`);
      setSelectedBusId(null);
      setBusBookings([]);
      fetchBuses();
    } catch {
      alert("Reset failed");
    }
  };

  const deleteBus = async (id) => {
    if (!window.confirm("Delete this bus permanently?")) return;

    try {
      await API.delete(`/buses/${id}`);
      fetchBuses();
    } catch {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>🛠 Admin Dashboard</h2>
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <CreateBusForm onBusCreated={fetchBuses} />

        <h3 style={styles.section}>All Buses</h3>

        {buses.length === 0 ? (
          <p style={styles.empty}>No buses available</p>
        ) : (
          buses.map((bus) => {
            const totalSeats = bus.seats.length;
            const bookedSeats = bus.seats.filter(
              (s) => s.status === "BOOKED"
            );

            return (
              <div key={bus._id} style={styles.card}>
                <div style={styles.cardTop}>
                  <div>
                    <h4 style={styles.busNo}>{bus.busNumber}</h4>
                    <p style={styles.route}>
                      {bus.source} → {bus.destination}
                    </p>
                  </div>

                  <div style={styles.price}>₹ {bus.price}</div>
                </div>

                <div style={styles.meta}>
                  <span>
                    🕒 {new Date(bus.startDateTime).toLocaleString()}
                  </span>
                  <span>
                    → {new Date(bus.endDateTime).toLocaleString()}
                  </span>
                </div>

                <p style={styles.seats}>
                  {bookedSeats.length} / {totalSeats} seats booked
                </p>

                <div style={styles.actions}>
                  <button
                    style={styles.secondary}
                    onClick={() => fetchBusBookings(bus._id)}
                  >
                    View Bookings
                  </button>

                  {/* ✅ RESET BUS BUTTON */}
                  <button
                    style={styles.warning}
                    onClick={() => setBusToReset(bus)}
                  >
                    Reset Bus
                  </button>

                  <button
                    style={styles.danger}
                    onClick={() => deleteBus(bus._id)}
                  >
                    Delete Bus
                  </button>
                </div>

                {/* BOOKINGS + SEAT GRID */}
                {selectedBusId === bus._id && (
                  <div style={styles.bookings}>
                    <h5>Bookings</h5>

                    {busBookings.length === 0 ? (
                      <p style={styles.empty}>
                        No bookings for this bus
                      </p>
                    ) : (
                      <>
                        <ul style={styles.list}>
                          {busBookings.map((b) => (
                            <li key={b._id}>
                              Seats {b.seats.join(", ")} — {b.userId.name}
                            </li>
                          ))}
                        </ul>

                        <AdminSeatGrid
                          bus={bus}
                          bookings={busBookings}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ✅ RESET MODAL (GLOBAL, NOT INSIDE MAP) */}
      {busToReset && (
        <ResetBusModal
          bus={busToReset}
          onConfirm={async () => {
            await resetBus(busToReset._id);
            setBusToReset(null);
          }}
          onCancel={() => setBusToReset(null)}
        />
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#2C3333",
    padding: "30px 0",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    color: "#E7F6F2",
  },
  logout: {
    background: "#A5C9CA",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  section: {
    color: "#E7F6F2",
    margin: "30px 0 20px",
  },
  card: {
    background: "#395B64",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  busNo: {
    color: "#E7F6F2",
  },
  route: {
    color: "#A5C9CA",
    fontSize: 14,
  },
  price: {
    fontSize: 22,
    color: "#E7F6F2",
    fontWeight: 600,
  },
  meta: {
    marginTop: 10,
    color: "#A5C9CA",
    fontSize: 13,
    display: "flex",
    gap: 10,
  },
  seats: {
    marginTop: 10,
    color: "#E7F6F2",
  },
  actions: {
    marginTop: 15,
    display: "flex",
    gap: 10,
  },
  secondary: {
    background: "#A5C9CA",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  warning: {
    background: "#E6B566",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    color: "#263232",
  },
  danger: {
    background: "#D9534F",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    color: "white",
  },
  bookings: {
    marginTop: 20,
    background: "#263232",
    padding: 14,
    borderRadius: 12,
    color: "#E7F6F2",
  },
  list: {
    paddingLeft: 18,
    marginTop: 10,
  },
  empty: {
    color: "#A5C9CA",
    fontStyle: "italic",
  },
};
