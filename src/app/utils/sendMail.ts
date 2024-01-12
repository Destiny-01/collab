import nodemailer from "nodemailer";

export default async function sendEmail(
  email: string,
  subject: string,
  content: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: "Sendee",
      to: email,
      subject: subject,
      html: content,
    });
    return true;
  } catch (error) {
    console.log("email not sent!", error);
    return false;
  }
}
