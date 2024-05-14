export declare class MailerService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, token: string): Promise<void>;
    generateToken(): Promise<unknown>;
}
