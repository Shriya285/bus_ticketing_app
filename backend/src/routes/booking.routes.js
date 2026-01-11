const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const bookingController = require("../controllers/booking.controller");
const admin = require("../middleware/admin.middleware");



router.post("/", auth, bookingController.bookSeat);
router.get("/my", auth, bookingController.getMyBookings);
router.delete("/:id", auth, bookingController.cancelBooking);
router.get(
  "/bus/:busId",
  auth,
  admin,
  bookingController.getBookingsByBus
);
module.exports = router;
