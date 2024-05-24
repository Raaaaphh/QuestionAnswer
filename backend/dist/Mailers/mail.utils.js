"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailInvitation = exports.sendMail = void 0;
const nodemailer = require("nodemailer");
const sendMail = (email, emailToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_MAIL,
            pass: process.env.GMAIL_MDP,
        },
    });
    const mailOptions = {
        from: `"Universiti Teknologi Petronas" <${process.env.GMAIL_MAIL}>`,
        to: email,
        subject: 'Please verify your email...',
        html: `<p>Hello, verify your email address by clicking on this</p>
               <br>
               <a href="http://localhost:5173/verify-email?emailToken=${emailToken}">Click here to verify</a>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.sendMail = sendMail;
const sendMailInvitation = (email, inviteLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_MAIL,
            pass: process.env.GMAIL_MDP,
        },
    });
    const mailOptions = {
        from: `"Universiti Teknologi Petronas" <${process.env.GMAIL_MAIL}>`,
        to: email,
        subject: 'You are invited to join our site',
        html: `<p>Hello,</p>
             <p>You have been invited to join our site. Please click the link below to register:</p>
             <a href="${inviteLink}">Register</a>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.sendMailInvitation = sendMailInvitation;
//# sourceMappingURL=mail.utils.js.map