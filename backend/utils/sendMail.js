const nodemailer = require("nodemailer");


const sendMail = async (to, subject, text) => {
    try {


        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        console.log("Email sent successfully");
    } catch (err) {
        console.log("Mail error:", err);
    }
};

module.exports = sendMail;








