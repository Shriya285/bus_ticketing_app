import { useState } from "react";
import API from "../api/api";

export default function CreateBusForm({ onBusCreated }) {
  const [form, setForm] = useState({
    busNumber: "",
    source: "",
    destination: "",
    startDateTime: "",
    endDateTime: "",
    price: "",
    totalSeats: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/buses", {
        ...form,
        price: Number(form.price),
        totalSeats: Number(form.totalSeats),
      });

      alert("Bus created successfully");
      onBusCreated();

      setForm({
        busNumber: "",
        source: "",
        destination: "",
        startDateTime: "",
        endDateTime: "",
        price: "",
        totalSeats: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create bus");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>➕ Create New Bus</h3>

      <div style={styles.grid}>
        <input
          name="busNumber"
          placeholder="Bus Number"
          value={form.busNumber}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={handleChange}
          style={styles.input}
        />

        <div>
          <label style={styles.label}>Start Date & Time</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={form.startDateTime}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>End Date & Time</label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={form.endDateTime}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <button style={styles.button}>Create Bus</button>
    </form>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  form: {
    background: "#395B64",
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
  },
  title: {
    color: "#E7F6F2",
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    outline: "none",
    background: "#263232",
    color: "#E7F6F2",
    fontSize: 14,
  },
  label: {
    display: "block",
    fontSize: 12,
    color: "#A5C9CA",
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
    background: "#A5C9CA",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
};
