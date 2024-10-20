import nodemailer from 'nodemailer'
// import config from '../config';

export const sendEmail = async (to:string, html:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
          user: "rahulsd380@gmail.com",
          pass: "gats cyux trfv rpxm",
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