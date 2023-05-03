const nodemailer = require("nodemailer");
module.exports = function  (req, res) {

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_PASS,
    pass: process.env.PASSWORD,
  },
});

// Send email
   transporter.sendMail(
  {
    from: "Your Name <abirchalghamie@gmail.com@gmail.com>",
    to: "abirchalghamie@example.com",
    subject: "Test Email",
    html: "<p>Hello, this is a test email!</p>",
  },
  (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  }
);}
