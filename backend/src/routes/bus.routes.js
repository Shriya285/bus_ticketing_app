const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const busController = require("../controllers/bus.controller");
const { deleteBus } = require("../controllers/bus.controller");

// const {
//   createBus,
//   getAllBuses,
//   getBusById,
//   deleteBus
// } = require("../controllers/bus.controller");

router.delete("/:id", auth, admin, deleteBus);

router.post("/", auth, admin, busController.createBus);
router.get("/", busController.getAllBuses);
router.put("/reset/:id", auth, admin, busController.resetBus);
router.delete("/:id", auth, admin, deleteBus);

module.exports = router;
