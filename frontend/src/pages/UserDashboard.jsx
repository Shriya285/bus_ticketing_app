import { useEffect, useState } from "react";
import API from "../api/api";
import SeatGrid from "../components/SeatGrid";

export default function UserDashboard() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const email = localStorage.getItem("email");

  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data || []); // 🔥 guard
    } catch {
      alert("Failed to load buses");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>User Dashboard</h2>
      <p>
        Welcome, <strong>{email || "User"}</strong>
      </p>
      <button onClick={logout}>Logout</button>
      <hr />

      <button onClick={() => window.location.href = "/my-bookings"}>
        My Bookings
      </button>

      {buses.length === 0 ? (
        <p>No buses available</p>
      ) : (
        buses.map((bus) => (
          <div
            key={bus._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 20,
            }}
          >
            <h4>{bus.busNumber}</h4>

            <p>
              {bus.source} → {bus.destination}
            </p>

            {/* 🔥 SAFE DATE RENDER */}
            {bus.startDateTime && bus.endDateTime && (
              <p>
                🕒{" "}
                {new Date(bus.startDateTime).toLocaleString()} →{" "}
                {new Date(bus.endDateTime).toLocaleString()}
              </p>
            )}

            <p>₹ {bus.price}</p>

            <h5>Select Seat</h5>

            {/* 🔥 PASS ONLY IF SEATS EXIST */}
            {bus.seats && bus.seats.length > 0 ? (
              <SeatGrid bus={bus} onSeatBooked={fetchBuses} />
            ) : (
              <p>No seats configured</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
