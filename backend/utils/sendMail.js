const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, text) => {
  try {
    
    await transporter.verify();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log(" Email sent:", info.response);

  } catch (err) {
    console.log(" MAIL ERROR FULL:", err);

    throw err; 
  }
};

module.exports = sendMail;