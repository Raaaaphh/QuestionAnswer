import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';


export const sendMail = (email: string, emailToken: string) => {
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
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export const sendMailInvitation = (email: string, inviteLink: string) => {
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
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
