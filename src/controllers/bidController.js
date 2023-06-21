
const bidModel = require("../models/bidModel");
const nodemailer = require("nodemailer");

exports.createBid = async (req, res) => {
  try {
    let data = req.body;
    let { bidderEmail, bidderName, bidderImage, bidAmount, projectName } = data;

    // Store bid details in the database
    await bidModel.create(data);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    
    const mailOptions = {
      from: "Chandranath Gupta",
      to: bidderEmail,
      subject: "Bid Confirmation",
      html: `Hi ${bidderName},<br><br>Thanks for bidding in ${projectName} on ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br><br>Thanks & Regards<br>Chandranath Gupta`,
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).send({ status: false, message: "Failed to send email." });
      } else {
        console.log("Email sent");
        res.status(200).send({ data: info });
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

