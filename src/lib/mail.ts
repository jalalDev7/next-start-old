import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "technochtak@gmail.com",
      pass: "rgzd wkvq caep aqnn",
    },
  });

  const mailOptions = {
    from: "technochtak3@gmail.com",
    to: email,
    subject: "Email verification",
    text: `Click to confirm email : ${confirmLink}`,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });
};
