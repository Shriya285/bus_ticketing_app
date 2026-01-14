export default function ResetBusModal({ bus, onConfirm, onCancel }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: 10 }}>Reset Bus</h3>

        <p style={{ marginBottom: 12 }}>
          Are you sure you want to reset this bus?
        </p>

        <p>
          <strong>Bus:</strong> {bus.busNumber}
        </p>
        <p>
          <strong>Route:</strong> {bus.source} → {bus.destination}
        </p>

        <p style={{ color: "#B85C5C", marginTop: 12 }}>
          ⚠ This will cancel <strong>all bookings</strong> and
          mark all seats as available.
        </p>

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button
            onClick={onConfirm}
            style={{
              background: "#D9534F",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Confirm Reset
          </button>

          <button
            onClick={onCancel}
            style={{
              background: "#A5C9CA",
              border: "none",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#2C3333",
  padding: 20,
  borderRadius: 10,
  width: 420,
};
