import { useState } from "react";
import BookingModal from "./BookingModal";

export default function SeatGrid({ bus, onSeatBooked }) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const seats = bus.seats || [];

  const openModal = (seatNumber) => {
    setSelectedSeat(Number(seatNumber));
    setShowModal(true);
  };

  const confirmBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          busId: bus._id,
          seatNumber: selectedSeat,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }

      alert("Seat booked successfully");
      setShowModal(false);
      setSelectedSeat(null);
      onSeatBooked();
    } catch {
      alert("Booking error");
    }
  };

  /* 2 LEFT — AISLE — 2 RIGHT */
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <>
      {/* LEGEND */}
      <div style={styles.legend}>
        <Legend color="#A5C9CA" label="Available" />
        <Legend color="#777" label="Booked" />
      </div>

      {/* BUS BODY */}
      <div style={styles.bus}>
        {rows.map((row, idx) => (
          <div key={idx} style={styles.row}>
            {/* LEFT */}
            <div style={styles.side}>
              {row.slice(0, 2).map(renderSeat)}
            </div>

            {/* AISLE */}
            <div style={styles.aisle} />

            {/* RIGHT */}
            <div style={styles.side}>
              {row.slice(2).map(renderSeat)}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <BookingModal
          bus={bus}
          seatNumber={selectedSeat}
          onConfirm={confirmBooking}
          onCancel={() => {
            setShowModal(false);
            setSelectedSeat(null);
          }}
        />
      )}
    </>
  );

  function renderSeat(seat) {
    if (!seat) return null;

    const isBooked = seat.status === "BOOKED";

    return (
      <div
        key={seat._id}
        onClick={() => !isBooked && openModal(seat.seatNumber)}
        style={{
          ...styles.seat,
          backgroundColor: isBooked ? "#777" : "#A5C9CA",
          cursor: isBooked ? "not-allowed" : "pointer",
        }}
      >
        {seat.seatNumber}
      </div>
    );
  }
}

/* ---------- LEGEND ---------- */
function Legend({ color, label }) {
  return (
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendBox, background: color }} />
      <span>{label}</span>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  legend: {
    display: "flex",
    gap: 24,
    marginBottom: 20,
    color: "#E7F6F2",
    fontSize: 14,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  bus: {
    background: "#395B64",
    padding: "30px 40px",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  side: {
    display: "flex",
    gap: 12,
  },
  aisle: {
    width: 80,
  },
  seat: {
    width: 52,
    height: 52,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    color: "#263232",
    userSelect: "none",
  },
};
