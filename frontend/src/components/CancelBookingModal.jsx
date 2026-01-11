export default function CancelBookingModal({
  booking,
  onConfirm,
  onCancel,
}) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Cancel Booking</h3>

        <p>
          Are you sure you want to cancel this booking?
        </p>

        <p><strong>Bus:</strong> {booking.busId.busNumber}</p>
        <p>
          <strong>Route:</strong>{" "}
          {booking.busId.source} → {booking.busId.destination}
        </p>
        <p>
          <strong>Seat:</strong> {booking.seatNumber}
        </p>
        <p>
          <strong>Departure:</strong>{" "}
          {new Date(booking.busId.startDateTime).toLocaleString()}
        </p>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={onConfirm}
            style={{ marginRight: 10, backgroundColor: "red", color: "white" }}
          >
            Confirm Cancel
          </button>

          <button onClick={onCancel}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 6,
  width: 400,
};
