import nodemailer from 'nodemailer';
import { dev } from '../config/index';

export const sendVerifyEmail = async (name: string, email: string, id: string, title: string) => {
  try {
    //create transporter
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: dev.smtp.auth_email,
        pass: dev.smtp.auth_pw
      }
    });

    const mailOptions = {
      from: dev.smtp.auth_email,
      to: email, //list of receivers
      subject: title,
      html: `<p>Hi ${name}! <a href="http://localhost:3007/api/users/verify?id=${id}">Please click on this link to verify your email address.</p>`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
