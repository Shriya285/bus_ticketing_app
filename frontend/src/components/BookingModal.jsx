export default function BookingModal({
  bus,
  seatNumber,
  onConfirm,
  onCancel,
}) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Confirm Booking</h3>

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
        <p><strong>Seat Number:</strong> {seatNumber}</p>
        <p><strong>Price:</strong> ₹{bus.price}</p>

        <div style={{ marginTop: 20 }}>
          <button onClick={onConfirm} style={{ marginRight: 10 }}>
            Confirm Booking
          </button>
          <button onClick={onCancel}>Cancel</button>
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
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  background: "white",
  padding: 20,
  borderRadius: 6,
  width: 400,
};
