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
      onBusCreated(); // refresh bus list

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
    <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
      <h3>Create Bus</h3>

      <input
        name="busNumber"
        placeholder="Bus Number"
        value={form.busNumber}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="source"
        placeholder="Source"
        value={form.source}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="destination"
        placeholder="Destination"
        value={form.destination}
        onChange={handleChange}
      />
      <br /><br />

      <label>Start Date & Time</label><br />
      <input
        type="datetime-local"
        name="startDateTime"
        value={form.startDateTime}
        onChange={handleChange}
      />
      <br /><br />

      <label>End Date & Time</label><br />
      <input
        type="datetime-local"
        name="endDateTime"
        value={form.endDateTime}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="totalSeats"
        placeholder="Total Seats"
        value={form.totalSeats}
        onChange={handleChange}
      />
      <br /><br />

      <button>Create Bus</button>
    </form>
  );
}
