const Bus = require("../models/bus");
const Booking = require("../models/booking");

/* =========================
   ADMIN: Create Bus
========================= */
exports.createBus = async (req, res) => {
  try {
    const {
      busNumber,
      source,
      destination,
      startDateTime,
      endDateTime,
      price,
      totalSeats,
    } = req.body;

    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        seatNumber: i,
        status: "AVAILABLE",
      });
    }

    const bus = await Bus.create({
      busNumber,
      source,
      destination,
      startDateTime,
      endDateTime,
      price,
      seats,
    });

    res.status(201).json(bus);
  } catch (err) {
    console.error("CREATE BUS ERROR:", err);
    res.status(500).json({ message: "Failed to create bus" });
  }
};

/* =========================
   PUBLIC: Get All Buses
========================= */
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};

/* =========================
   ADMIN: Reset Bus (🔥 FIXED)
========================= */
exports.resetBus = async (req, res) => {
  try {
    const busId = req.params.id;

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // 1️⃣ Reset all seats
    bus.seats.forEach(seat => {
      seat.status = "AVAILABLE";
    });
    await bus.save();

    // 2️⃣ DELETE ALL BOOKINGS FOR THIS BUS 🔥
    await Booking.deleteMany({ busId });

    res.json({ message: "Bus reset successful" });
  } catch (err) {
    console.error("RESET BUS ERROR:", err);
    res.status(500).json({ message: "Reset failed" });
  }
};

/* =========================
   ADMIN: Delete Bus
========================= */
exports.deleteBus = async (req, res) => {
  try {
    const busId = req.params.id;

    await Bus.findByIdAndDelete(busId);
    await Booking.deleteMany({ busId });

    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    console.error("DELETE BUS ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
