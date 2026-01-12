import { useEffect, useState } from "react";
import API from "../api/api";
import CancelBookingModal from "../components/CancelBookingModal";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch {
      alert("Failed to fetch bookings");
    }
  };

  const confirmCancel = async () => {
    try {
      await API.delete(`/bookings/${selectedBooking._id}`);
      setSelectedBooking(null);
      fetchBookings();
    } catch {
      alert("Cancel failed");
    }
  };

  return (
    <>
      <Navbar
        active="bookings"
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      />

      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>My Bookings</h2>

          {bookings.filter(b => b.busId).length === 0 ? (
            <p style={styles.sub}>No bookings yet</p>
          ) : (
            bookings
              .filter(b => b.busId)
              .map((b) => (
                <div key={b._id} style={styles.card}>
                  <div style={styles.topRow}>
                    <h3 style={styles.bus}>{b.busId.busNumber}</h3>
                    <span style={styles.seat}>Seat {b.seatNumber}</span>
                  </div>

                  <p style={styles.route}>
                    {b.busId.source} → {b.busId.destination}
                  </p>

                  <p style={styles.time}>
                    🕒{" "}
                    {new Date(b.busId.startDateTime).toLocaleString()} →{" "}
                    {new Date(b.busId.endDateTime).toLocaleString()}
                  </p>

                  <button
                    style={styles.cancelBtn}
                    onClick={() => setSelectedBooking(b)}
                  >
                    Cancel Booking
                  </button>
                </div>
              ))
          )}
        </div>
      </div>

      {selectedBooking && (
        <CancelBookingModal
          booking={selectedBooking}
          onConfirm={confirmCancel}
          onCancel={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    background: "#2C3333",
    minHeight: "100vh",
    padding: "30px 0",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 24px",
  },
  heading: {
    color: "#E7F6F2",
    marginBottom: 24,
  },
  sub: {
    color: "#A5C9CA",
  },
  card: {
    background: "#395B64",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bus: {
    color: "#E7F6F2",
    margin: 0,
  },
  seat: {
    background: "#A5C9CA",
    color: "#263232",
    padding: "6px 12px",
    borderRadius: 8,
    fontWeight: 600,
  },
  route: {
    color: "#A5C9CA",
    marginTop: 8,
  },
  time: {
    color: "#E7F6F2",
    fontSize: 14,
    marginTop: 6,
  },
  cancelBtn: {
    marginTop: 14,
    background: "#B85C5C",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
};
