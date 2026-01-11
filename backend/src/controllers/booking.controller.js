const Bus = require("../models/bus");
const Booking = require("../models/booking");

// USER: Book seat
exports.bookSeat = async (req, res) => {
  try {
    const { busId, seatNumber } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const seat = bus.seats.find(
      (s) => s.seatNumber === seatNumber
    );
    if (!seat) return res.status(404).json({ message: "Seat not found" });

    if (seat.status === "BOOKED") {
      return res.status(400).json({ message: "Seat already booked" });
    }

    // Atomic update
    seat.status = "BOOKED";
    await bus.save();

    await Booking.create({
      userId: req.user.userId,
      busId: bus._id,
      seatNumber,
    });

    res.status(201).json({ message: "Seat booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// USER: View own bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate("busId", "busNumber source destination startDateTime endDateTime");

    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// USER: Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const bus = await Bus.findById(booking.busId);
    const seat = bus.seats.find(
      (s) => s.seatNumber === booking.seatNumber
    );

    if (seat) seat.status = "AVAILABLE";
    await bus.save();

    await booking.deleteOne();

    res.json({ message: "Booking cancelled" });
  } catch {
    res.status(500).json({ message: "Cancel failed" });
  }
};
// ADMIN: View bookings for a bus
exports.getBookingsByBus = async (req, res) => {
  try {
    const bookings = await Booking.find({ busId: req.params.busId })
      .populate("userId", "name email");

    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    await Booking.deleteMany({ busId: req.params.id }); // cleanup
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
