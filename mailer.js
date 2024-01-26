import nodemailer from "nodemailer";
import { UKR_PASS, UKR_MAIL } from "./envConfig.js";

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_MAIL,
    pass: UKR_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendMail = (data) => {
  const email = {
    ...data,
    from: UKR_MAIL,
  };
  return transporter.sendMail(email);
};

// const emailOptions = {
//   from: "rubikonspace@ukr.net",
//   to: "jaxoti6704@wuzak.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// };

// transporter
//   .sendMail(emailOptions)
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));
