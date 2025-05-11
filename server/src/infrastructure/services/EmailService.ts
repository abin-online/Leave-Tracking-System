import nodemailer, { Transporter } from 'nodemailer';
import { IEmailService } from '../../domain/services/IEmailService';

export class EmailService implements IEmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendOTP(email: string, otp: string, name: string): Promise<boolean> {
    const mailOptions = {
      from: `"Leave Tracker" <${process.env.SMTP_USER || 'noreply@leavetracker.com'}>`,
      to: email,
      subject: 'Your Verification Code',
      text: `Hello ${name},\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nRegards,\nLeave Tracker Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${name},</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 10px; font-size: 24px; text-align: center; margin: 20px 0; letter-spacing: 5px; font-weight: bold;">
            ${otp}
          </div>
          <p>This code will expire in <strong>10 minutes</strong>.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Regards,<br/>Leave Tracker Team</p>
        </div>
      `
    };

    return this.sendMail(mailOptions, 'OTP');
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const mailOptions = {
      from: `"Leave Tracker" <${process.env.SMTP_USER || 'noreply@leavetracker.com'}>`,
      to: email,
      subject: 'Welcome to Leave Tracker',
      text: `Hello ${name},\n\nWelcome to Leave Tracker! Your account has been successfully created.\n\nRegards,\nLeave Tracker Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to Leave Tracker!</h2>
          <p>Hello ${name},</p>
          <p>Your account has been successfully created.</p>
          <p>You can now log in to the application and start tracking your leave.</p>
          <p>Regards,<br/>Leave Tracker Team</p>
        </div>
      `
    };

    return this.sendMail(mailOptions, 'Welcome Email');
  }

  async sendManagerApprovalEmail(email: string, name: string): Promise<boolean> {
    const mailOptions = {
      from: `"Leave Tracker" <${process.env.SMTP_USER || 'noreply@leavetracker.com'}>`,
      to: email,
      subject: 'Your Manager Account Has Been Approved',
      text: `Hello ${name},\n\nYour manager account has been approved! You can now log in to the Leave Tracker system.\n\nRegards,\nLeave Tracker Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Manager Account Is Approved!</h2>
          <p>Hello ${name},</p>
          <p>Your manager account has been approved by an administrator.</p>
          <p>You can now log in to the application and start managing leave requests.</p>
          <p>Regards,<br/>Leave Tracker Team</p>
        </div>
      `
    };

    return this.sendMail(mailOptions, 'Manager Approval');
  }

  private async sendMail(mailOptions: any, type: string): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail(mailOptions);

    //   if (process.env.NODE_ENV !== 'production') {
    //     console.log(`[${type}] Email preview URL:`, nodemailer.getTestMessageUrl(info));
    //   }

      return true;
    } catch (error) {
      console.error(`Error sending ${type} email:`, error);
      return false;
    }
  }
}
