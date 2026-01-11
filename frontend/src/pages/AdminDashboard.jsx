import { useEffect, useState } from "react";
import API from "../api/api";
import CreateBusForm from "../components/CreateBusForm";

export default function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [busBookings, setBusBookings] = useState([]);
  
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch {
      alert("Failed to fetch buses");
    }
  };

  const fetchBusBookings = async (busId) => {
    setBusBookings([]);        // 🔥 CLEAR OLD DATA FIRST
    setSelectedBusId(busId);

    try {
      const res = await API.get(`/bookings/bus/${busId}`);
      setBusBookings(res.data);
    } catch {
      alert("Failed to fetch bookings");
    }
  };


  const resetBus = async (id) => {
    try {
      await API.put(`/buses/reset/${id}`);
      setSelectedBusId(null);
      setBusBookings([]);
      fetchBuses();
    } catch {
      alert("Reset failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <hr />
      <CreateBusForm onBusCreated={fetchBuses} />
      <hr />
      <h3>All Buses</h3>

      {buses.length === 0 ? (
        <p>No buses available</p>
      ) : (
        buses.map((bus) => {
          const totalSeats = bus.seats.length;
          const bookedSeats = bus.seats.filter(
            (s) => s.status === "BOOKED"
          );

          return (
            <div
              key={bus._id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 20,
              }}
            >
              <p><strong>Bus Number:</strong> {bus.busNumber}</p>
              <p>
                <strong>Route:</strong> {bus.source} → {bus.destination}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(bus.startDateTime).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(bus.endDateTime).toLocaleString()}
              </p>
              <p><strong>Price:</strong> ₹{bus.price}</p>
              <p>
                <strong>Seats:</strong>{" "}
                {bookedSeats.length} / {totalSeats} booked
              </p>

              <button
                onClick={() => fetchBusBookings(bus._id)}
                style={{ marginRight: 10 }}
              >
                View Bookings
              </button>

              <button onClick={() => resetBus(bus._id)}>
                Reset Bus
              </button>
              
              {/* BOOKINGS LIST */}
              {selectedBusId === bus._id && (
                <div style={{ marginTop: 15 }}>
                  <h4>Bookings</h4>

                  {busBookings.length === 0 ? (
                    <p>No bookings for this bus</p>
                  ) : (
                    <ul>
                      {busBookings.map((b) => (
                        <li key={b._id}>
                          Seat {b.seatNumber} — {b.userId.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
