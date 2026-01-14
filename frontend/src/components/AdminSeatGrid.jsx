export default function AdminSeatGrid({ bus, bookings = [] }) {
  if (!bus || !Array.isArray(bus.seats)) return null;

  /* Map seatNumber → user name */
  const bookingMap = {};

  bookings.forEach((booking) => {
    // ✅ NEW STRUCTURE (seats array)
    if (Array.isArray(booking.seats)) {
      booking.seats.forEach((seatNum) => {
        bookingMap[seatNum] = booking.userId?.name || "Unknown";
      });
    }

    // ✅ OLD STRUCTURE (single seatNumber)
    if (booking.seatNumber) {
      bookingMap[booking.seatNumber] =
        booking.userId?.name || "Unknown";
    }
  });

  /* Build rows: 2 LEFT — AISLE — 2 RIGHT */
  const rows = [];
  for (let i = 0; i < bus.seats.length; i += 4) {
    rows.push(bus.seats.slice(i, i + 4));
  }

  return (
    <div style={styles.wrapper}>
      <h6 style={styles.title}>Seat Layout</h6>

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
    </div>
  );

  function renderSeat(seat) {
    if (!seat) return null;

    const bookedBy = bookingMap[seat.seatNumber];
    const isBooked = seat.status === "BOOKED";

    return (
      <div
        key={seat.seatNumber}
        title={
          isBooked && bookedBy
            ? `Booked by ${bookedBy}`
            : "Available"
        }
        style={{
          ...styles.seat,
          backgroundColor: isBooked ? "#4A90E2" : "#A5C9CA",
          color: isBooked ? "#fff" : "#263232",
          cursor: "default",
        }}
      >
        {seat.seatNumber}
      </div>
    );
  }
}

/* ---------- STYLES ---------- */
const styles = {
  wrapper: {
    marginTop: 20,
  },
  title: {
    color: "#E7F6F2",
    marginBottom: 12,
    fontWeight: 600,
  },
  bus: {
    background: "#395B64",
    padding: "24px 32px",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  side: {
    display: "flex",
    gap: 12,
  },
  aisle: {
    width: 80,
  },
  seat: {
    width: 50,
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    userSelect: "none",
  },
};
