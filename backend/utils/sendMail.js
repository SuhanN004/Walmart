const { Resend } = require("resend");
const fs = require("fs");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, text, filePath = null) => {
  try {

    
    const attachments = filePath
      ? [
          {
            filename: "GST_Invoice.pdf",
            content: fs.readFileSync(filePath).toString("base64"),
          },
        ]
      : [];

   
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      text: text,
      attachments: attachments, 
    });

    console.log("Email sent:", data);

  } catch (err) {
    console.log("MAIL ERROR:", err);
    throw err;
  }
};

module.exports = sendMail;