import { useState } from "react";
import SeatGrid from "./SeatGrid";

export default function BusCard({ bus, onSeatBooked }) {
  const [showSeats, setShowSeats] = useState(false);

  const availableSeats = bus.seats.filter(
    (s) => s.status === "AVAILABLE"
  ).length;

  return (
    <div style={styles.wrapper}>
      {/* CENTERED CARD */}
      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          {/* LEFT — Bus Info */}
          <div style={styles.left}>
            <h3 style={styles.route}>
              {bus.source} → {bus.destination}
            </h3>
            <p style={styles.subText}>🚌 {bus.busNumber}</p>
          </div>

          {/* CENTER — Timings */}
          <div style={styles.center}>
            <div style={styles.timeRow}>
              <div style={styles.timeBlock}>
                <div style={styles.time}>
                  {new Date(bus.startDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div style={styles.city}>{bus.source}</div>
              </div>

              <div style={styles.line}>
                <span style={styles.duration}>
                  {Math.round(
                    (new Date(bus.endDateTime) -
                      new Date(bus.startDateTime)) /
                      (1000 * 60 * 60)
                  )}{" "}
                  hrs
                </span>
              </div>

              <div style={styles.timeBlock}>
                <div style={styles.time}>
                  {new Date(bus.endDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div style={styles.city}>{bus.destination}</div>
              </div>
            </div>

            <p style={styles.seats}>
              {availableSeats} seats available
            </p>
          </div>

          {/* RIGHT — Price + Action */}
          <div style={styles.right}>
            <div style={styles.price}>₹ {bus.price}</div>
            <button
              style={styles.button}
              onClick={() => setShowSeats(!showSeats)}
            >
              {showSeats ? "Hide Seats" : "View Seats"}
            </button>
          </div>
        </div>
      </div>

      {/* SEAT LAYOUT */}
      {showSeats && (
        <div style={styles.seatWrapper}>
          <SeatGrid bus={bus} onSeatBooked={onSeatBooked} />
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
  },

  cardWrapper: {
    display: "flex",
    justifyContent: "center", /* Centers horizontally */
    // alignItems: "center",     /* Centers vertically */
  },

  card: {
    width: "100%",
    maxWidth: "1100px", // 🔥 RedBus-like width
    background: "#395B64",
    borderRadius: 18,
    padding: "28px 36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
  },

  left: {
    flex: 1.2,
  },

  center: {
    flex: 2,
  },

  right: {
    flex: 1,
    textAlign: "right",
  },

  route: {
    fontSize: 20,
    color: "#E7F6F2",
    marginBottom: 6,
  },

  subText: {
    color: "#A5C9CA",
    fontSize: 14,
  },

  timeRow: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },

  timeBlock: {
    textAlign: "center",
  },

  time: {
    fontSize: 22,
    color: "#E7F6F2",
  },

  city: {
    fontSize: 12,
    color: "#A5C9CA",
  },

  line: {
    flex: 1,
    height: 2,
    background: "#A5C9CA",
    position: "relative",
  },

  duration: {
    position: "absolute",
    top: -18,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 12,
    color: "#A5C9CA",
  },

  seats: {
    marginTop: 10,
    fontSize: 14,
    color: "#A5C9CA",
  },

  price: {
    fontSize: 26,
    color: "#E7F6F2",
    marginBottom: 10,
  },

  button: {
    background: "#A5C9CA",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },

  seatWrapper: {
    marginTop: 20,
    background: "#263232",
    padding: 20,
    borderRadius: 16,
    maxWidth: "1100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
