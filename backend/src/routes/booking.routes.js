const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
// const bookingController = require("../controllers/booking.controller");


const {
  bookSeat,
  getMyBookings,
  cancelSeat,
  cancelEntireBooking,
  getBookingsByBus,
} = require("../controllers/booking.controller");
// Book seat
router.post("/", auth, bookSeat);

// My bookings
router.get("/my", auth, getMyBookings);

// Cancel single seat
router.delete("/:id/seat", auth, cancelSeat);

// Cancel entire booking
router.delete("/:id", auth, cancelEntireBooking);

// Admin view bookings
router.get("/bus/:busId", auth, getBookingsByBus);

module.exports = router;