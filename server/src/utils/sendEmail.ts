import nodemailer from 'nodemailer';
import { dev } from '../config/index';

export type emailData = {
  email: string;
  subject: string;
  html: string;
};

export const sendEmail = async (emailData: emailData) => {
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
      to: emailData.email, //list of receivers
      subject: emailData.subject,
      html: emailData.html
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
