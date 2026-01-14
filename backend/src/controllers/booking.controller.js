const Bus = require("../models/bus");
const Booking = require("../models/booking");

/* ============================
   USER: BOOK SEAT
============================ */
exports.bookSeat = async (req, res) => {
  try {
    const { busId, seatNumber } = req.body;
    const userId = req.user.userId;

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const seat = bus.seats.find(s => s.seatNumber === seatNumber);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (seat.status === "BOOKED") {
      return res.status(400).json({ message: "Seat already booked" });
    }

    // 1️⃣ Mark seat as BOOKED
    seat.status = "BOOKED";
    await bus.save();

    // 2️⃣ Find existing booking for this user + bus
    let booking = await Booking.findOne({ userId, busId });

    if (booking) {
      if (booking.seats.includes(seatNumber)) {
        return res.status(400).json({ message: "Seat already booked by you" });
      }
      booking.seats.push(seatNumber);
      await booking.save();
    } else {
      await Booking.create({
        userId,
        busId,
        seats: [seatNumber],
      });
    }

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
  } catch (err) {
    console.error("FETCH BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/* ============================
   USER: CANCEL SINGLE SEAT
============================ */
exports.cancelSeat = async (req, res) => {
  try {
    const { seatNumber } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const bus = await Bus.findById(booking.busId);

    // 1️⃣ Make seat AVAILABLE again
    const seat = bus.seats.find(s => s.seatNumber === seatNumber);
    if (seat) {
      seat.status = "AVAILABLE";
    }

    await bus.save();

    // 2️⃣ Remove seat from booking
    booking.seats = booking.seats.filter(s => s !== seatNumber);

    // 3️⃣ If no seats left → delete booking
    if (booking.seats.length === 0) {
      await booking.deleteOne();
    } else {
      await booking.save();
    }

    res.json({ message: "Seat cancelled successfully" });
  } catch (err) {
    console.error("CANCEL SEAT ERROR:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
};

/* ============================
   USER: CANCEL ENTIRE BOOKING
============================ */
exports.cancelEntireBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const bus = await Bus.findById(booking.busId);

    // Free all seats
    booking.seats.forEach(seatNum => {
      const seat = bus.seats.find(s => s.seatNumber === seatNum);
      if (seat) seat.status = "AVAILABLE";
    });

    await bus.save();
    await booking.deleteOne();

    res.json({ message: "Entire booking cancelled" });
  } catch (err) {
    console.error("CANCEL ENTIRE BOOKING ERROR:", err);
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
  } catch (err) {
    console.error("ADMIN FETCH BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
