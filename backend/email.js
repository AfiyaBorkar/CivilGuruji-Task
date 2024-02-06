// email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "arfiesolutions@gmail.com",
    pass: "kbwj eljt fgwd hhim",
  },
});

const sendMail = (from, to, subject, text) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info.response);
      }
    });
  });
};

export default sendMail;
