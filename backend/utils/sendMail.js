const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, text) => {
  try {

    const data = await resend.emails.send({
      from: "suhanvnrs@gmail.com.", 
      to: to,
      subject: subject,
      text: text,
    });

    console.log(" Email sent:", data);

  } catch (err) {
    console.log(" MAIL ERROR:", err);
    throw err;
  }
};

module.exports = sendMail;