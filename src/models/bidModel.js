const mongoose = require("mongoose")

const bidSchema = new mongoose.Schema({
    bidderEmail: String,
    bidderName: String,
    bidderImage: String,
    bidAmount: Number,
    projectName: String,
  });
  
  // Create the bid model
module.exports = mongoose.model('Bid', bidSchema);
  