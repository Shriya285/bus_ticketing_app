const Bus = require("../models/bus");

// ADMIN: Create bus
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
      seats.push({ seatNumber: i });
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
    res.status(500).json({ message: "Failed to create bus" });
  }
};

// PUBLIC: Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch {
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};

// ADMIN: Reset bus
exports.resetBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    bus.seats.forEach((seat) => (seat.status = "AVAILABLE"));
    await bus.save();

    res.json({ message: "Bus reset successful" });
  } catch {
    res.status(500).json({ message: "Reset failed" });
  }
};
exports.deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    await Booking.deleteMany({ busId: req.params.id });
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
