import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async (to:string, html:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === "production",
        auth: {
          user: "rahulsd380@gmail.com",
          pass: "dkbq cozx vvpi annm",
        },
      });

      await transporter.sendMail({
        from: 'rahulsd380@gmail.com', // sender address
        to,
        subject: "Reset your password within 10 minutes", // Subject line
        text: "Reset your password within 10 minutes", // plain text body
        html
      });
}