export default function CancelBookingModal({
  booking,
  onConfirm,
  onCancel,
}) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Cancel Booking</h3>

        <p style={styles.text}>
          Are you sure you want to cancel this booking?
        </p>

        <div style={styles.details}>
          <p><strong>Bus:</strong> {booking.busId.busNumber}</p>
          <p>
            <strong>Route:</strong>{" "}
            {booking.busId.source} → {booking.busId.destination}
          </p>
          <p><strong>Seat:</strong> {booking.seatNumber}</p>
          <p>
            <strong>Departure:</strong>{" "}
            {new Date(booking.busId.startDateTime).toLocaleString()}
          </p>
        </div>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onConfirm}>
            Yes, Cancel
          </button>

          <button style={styles.backBtn} onClick={onCancel}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#395B64",
    color: "#E7F6F2",
    padding: 24,
    borderRadius: 16,
    width: 420,
    maxWidth: "90%",
  },
  title: {
    marginTop: 0,
    marginBottom: 12,
  },
  text: {
    color: "#A5C9CA",
    marginBottom: 16,
  },
  details: {
    background: "#2C3333",
    padding: 14,
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.6,
  },
  actions: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    background: "#B85C5C",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  backBtn: {
    background: "#A5C9CA",
    color: "#263232",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
};
