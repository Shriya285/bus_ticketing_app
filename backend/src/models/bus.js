const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: Number,
  status: {
    type: String,
    enum: ["AVAILABLE", "BOOKED"],
    default: "AVAILABLE",
  },
});

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    source: String,
    destination: String,
    startDateTime: Date,
    endDateTime: Date,
    price: Number,
    seats: [seatSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);
