import { useEffect, useState } from "react";
import API from "../api/api";
import CancelBookingModal from "../components/CancelBookingModal";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

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
      // 🔥 Cancel single seat
      if (selectedSeat) {
        await API.delete(`/bookings/${selectedBooking._id}/seat`, {
          data: { seatNumber: selectedSeat },
        });
      }
      // 🔥 Cancel entire booking
      else {
        await API.delete(`/bookings/${selectedBooking._id}`);
      }

      setSelectedBooking(null);
      setSelectedSeat(null);
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

          {bookings.length === 0 ? (
            <p style={styles.sub}>No bookings yet</p>
          ) : (
            bookings.map((b) => (
              <div key={b._id} style={styles.card}>
                <h3 style={styles.bus}>{b.busId.busNumber}</h3>

                <p style={styles.route}>
                  {b.busId.source} → {b.busId.destination}
                </p>

                <p style={styles.time}>
                  🕒{" "}
                  {new Date(b.busId.startDateTime).toLocaleString()} →{" "}
                  {new Date(b.busId.endDateTime).toLocaleString()}
                </p>

                {/* 🔥 Seat chips */}
                <div style={styles.seatRow}>
                  {b.seats.map((seat) => (
                    <span
                      key={seat}
                      style={styles.seat}
                      title="Cancel this seat"
                      onClick={() => {
                        setSelectedBooking(b);
                        setSelectedSeat(seat);
                      }}
                    >
                      Seat {seat} ✖
                    </span>
                  ))}
                </div>

                {/* 🔥 Cancel all */}
                <button
                  style={styles.cancelAll}
                  onClick={() => {
                    setSelectedBooking(b);
                    setSelectedSeat(null);
                  }}
                >
                  Cancel Entire Booking
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBooking && (
        <CancelBookingModal
          booking={selectedBooking}
          seatNumber={selectedSeat}
          onConfirm={confirmCancel}
          onCancel={() => {
            setSelectedBooking(null);
            setSelectedSeat(null);
          }}
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
  bus: {
    color: "#E7F6F2",
    marginBottom: 6,
  },
  route: {
    color: "#A5C9CA",
    fontSize: 14,
  },
  time: {
    color: "#E7F6F2",
    fontSize: 14,
    marginTop: 6,
  },
  seatRow: {
    marginTop: 14,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  seat: {
    background: "#A5C9CA",
    color: "#263232",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelAll: {
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
