import { useState } from "react";
import API from "../api/api";

export default function SeatLayout({ bus }) {
  const [loadingSeat, setLoadingSeat] = useState(null);

  const bookSeat = async (seatNumber) => {
    if (!window.confirm(`Book seat ${seatNumber}?`)) return;

    try {
      setLoadingSeat(seatNumber);
      await API.post("/bookings", {
        busId: bus._id,
        seatNumber,
      });
      alert("Seat booked successfully");
      window.location.reload();
    } catch {
      alert("Booking failed");
    } finally {
      setLoadingSeat(null);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 200 }}>
      {bus.seats.map((seat) => (
        <button
          key={seat._id}
          disabled={seat.status === "BOOKED"}
          onClick={() => bookSeat(seat.seatNumber)}
          style={{
            width: 40,
            height: 40,
            margin: 5,
            backgroundColor:
              seat.status === "BOOKED" ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            cursor:
              seat.status === "BOOKED" ? "not-allowed" : "pointer",
          }}
        >
          {seat.seatNumber}
        </button>
      ))}
    </div>
  );
}
