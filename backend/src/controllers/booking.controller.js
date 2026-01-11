const Bus = require("../models/bus");
const Booking = require("../models/booking");

/* ============================
   USER: BOOK SEAT
============================ */
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

    // Update seat
    seat.status = "BOOKED";
    await bus.save();

    // Create booking
    await Booking.create({
      userId: req.user.userId,
      busId: bus._id,
      seatNumber,
    });

    res.status(201).json({ message: "Seat booked successfully" });
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

/* ============================
   USER: VIEW OWN BOOKINGS
============================ */
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.userId,
    }).populate(
      "busId",
      "busNumber source destination startDateTime endDateTime price"
    );

    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/* ============================
   USER: CANCEL BOOKING
============================ */
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

/* ============================
   ADMIN: VIEW BOOKINGS BY BUS
============================ */
exports.getBookingsByBus = async (req, res) => {
  try {
    const bookings = await Booking.find({
      busId: req.params.busId,
    }).populate("userId", "name email");

    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
