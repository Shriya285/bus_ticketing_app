import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      console.log("MY BOOKINGS:", res.data); // 🔥 DEBUG
      setBookings(res.data);
    } catch (err) {
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 15,
            }}
          >
            <p><strong>Bus:</strong> {b.busId.busNumber}</p>
            <p>
              <strong>Route:</strong>{" "}
              {b.busId.source} → {b.busId.destination}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(b.busId.startDateTime).toLocaleString()} →{" "}
              {new Date(b.busId.endDateTime).toLocaleString()}
            </p>
            <p><strong>Seat:</strong> {b.seatNumber}</p>

            <button
              onClick={async () => {
                if (!window.confirm("Cancel this booking?")) return;
                await API.delete(`/bookings/${b._id}`);
                fetchBookings();
              }}
              style={{ color: "red" }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}
