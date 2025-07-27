const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlertsSchema = new Schema({
    name: String,
    mail: String,
    seviyarity: {
      type: [String], // Array of strings to allow multiple values
      enum: ['critical', 'high', 'medium', 'low'], // Enum constraint for severity levels
      required: true, // Ensures the field is provided
  },
});

module.exports = mongoose.model('Alerts', AlertsSchema);
