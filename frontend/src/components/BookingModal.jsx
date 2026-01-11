export default function BookingModal({
  bus,
  seatNumber,
  onConfirm,
  onCancel,
}) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={titleStyle}>Confirm Booking</h3>

        <div style={infoStyle}>
          <p><strong>Bus:</strong> {bus.busNumber}</p>
          <p>
            <strong>Route:</strong> {bus.source} → {bus.destination}
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {new Date(bus.startDateTime).toLocaleString()}
          </p>
          <p>
            <strong>Arrival:</strong>{" "}
            {new Date(bus.endDateTime).toLocaleString()}
          </p>
          <p><strong>Seat:</strong> {seatNumber}</p>
          <p><strong>Price:</strong> ₹{bus.price}</p>
        </div>

        <div style={buttonRow}>
          <button style={cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button style={confirmBtn} onClick={onConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── STYLES ───────── */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modalStyle = {
  background: "#395B64",
  padding: "28px 32px",
  borderRadius: 16,
  width: 420,
  color: "#E7F6F2",
  boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
};

const titleStyle = {
  marginBottom: 18,
  textAlign: "center",
  fontSize: 20,
};

const infoStyle = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "#A5C9CA",
};

const buttonRow = {
  marginTop: 26,
  display: "flex",
  gap: 12,
};

const cancelBtn = {
  flex: 1,
  background: "transparent",
  border: "1px solid #A5C9CA",
  color: "#A5C9CA",
  padding: "10px 0",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
};

const confirmBtn = {
  flex: 1,
  background: "#A5C9CA",
  border: "none",
  color: "#263232",
  padding: "10px 0",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 700,
};
