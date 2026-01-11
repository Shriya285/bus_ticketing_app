import { useState } from "react";
import BookingModal from "./BookingModal";

export default function SeatGrid({ bus, onSeatBooked }) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (seatNumber) => {
    setSelectedSeat(seatNumber);
    setShowModal(true);
  };

  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");

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
      onSeatBooked();
    } catch {
      alert("Booking error");
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {bus.seats.map((seat) => (
          <button
            key={seat._id}
            disabled={seat.status === "BOOKED"}
            onClick={() => openModal(seat.seatNumber)}
            style={{
              width: 45,
              height: 45,
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

      {showModal && (
        <BookingModal
          bus={bus}
          seatNumber={selectedSeat}
          onConfirm={confirmBooking}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
