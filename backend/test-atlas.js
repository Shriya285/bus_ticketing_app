const mongoose = require("mongoose");

// 🔴 TEMPORARY: paste your FULL Atlas URI here
const MONGO_URI =
  "mongodb+srv://shriya_db:Shriya%40123@clusterhv.qk4defi.mongodb.net/?appName=Clusterhv";

console.log("DEBUG MONGO_URI =", MONGO_URI);

async function testAtlas() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    const Test = mongoose.connection.collection("connection_test");

    const insertResult = await Test.insertOne({
      message: "Atlas connection successful",
      createdAt: new Date(),
    });

    console.log("📥 Inserted document ID:", insertResult.insertedId);

    const doc = await Test.findOne({ _id: insertResult.insertedId });
    console.log("📤 Read document:", doc);
  } catch (err) {
    console.error("❌ Atlas test failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

testAtlas();
