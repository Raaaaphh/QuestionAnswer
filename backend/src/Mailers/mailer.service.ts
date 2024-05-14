import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            auth: {
                user: 'user@example.com',
                pass: 'password',
            },
        });
    }

    async sendVerificationEmail(email: string, token: string) {
        const url = `http://localhost:3000/verify-email?token=${token}`;
        const message = {
            from: 'noreply@example.com',
            to: email,
            subject: 'Vérifiez votre adresse e-mail',
            text: `Cliquez sur le lien suivant pour vérifier votre adresse e-mail : ${url}`,
        };
        await this.transporter.sendMail(message);
    }

    async generateToken() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const token = buf.toString('hex');
                resolve(token);
            });
        });
    }
}
