package com.careerguide.careerbackend.service;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostConstruct
    public void logMailDiagnostics() {
        if (mailSender instanceof JavaMailSenderImpl impl) {
            String host = impl.getHost();
            int port = impl.getPort();
            String username = impl.getUsername();
            String maskedUsername = (username != null && !username.isBlank())
                    ? (username.contains("@") ? username.replaceAll("(^.{2}).*(@.*)", "$1***$2") : "[configured]")
                    : "[NOT SET]";
            boolean hasPassword = impl.getPassword() != null && !impl.getPassword().isBlank();
            String auth = impl.getJavaMailProperties().getProperty("mail.smtp.auth");
            String starttls = impl.getJavaMailProperties().getProperty("mail.smtp.starttls.enable");

            System.out.println("=== Effective Mail Configuration Diagnostics ===");
            System.out.println("SMTP Host             : " + host);
            System.out.println("SMTP Port             : " + port);
            System.out.println("SMTP Username         : " + maskedUsername);
            System.out.println("SMTP Password Status  : " + (hasPassword ? "configured" : "NOT SET"));
            System.out.println("SMTP Auth Enabled     : " + auth);
            System.out.println("SMTP STARTTLS Enabled : " + starttls);
            System.out.println("=================================================");
        }
    }

    public void sendPasswordResetEmail(String recipientEmail, String resetLink) throws MessagingException {
        sendPasswordResetEmail(recipientEmail, resetLink, 15);
    }

    public void sendPasswordResetEmail(String recipientEmail, String resetLink, int expirationMinutes) throws MessagingException {
        if (recipientEmail == null || recipientEmail.isBlank()) {
            throw new IllegalArgumentException("Recipient email cannot be empty");
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(recipientEmail.trim());
        helper.setSubject("CareerGuide - Password Reset Request");

        String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Password Reset Request</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <h2 style="color: #2563eb; margin-top: 0;">🎓 CareerGuide</h2>
                    <h3 style="color: #0b192c;">Password Reset Request</h3>
                    <p>Hello,</p>
                    <p>We received a request to reset the password for your CareerGuide account.</p>
                    <p style="margin: 25px 0;">
                        <a href="%s" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                            Reset My Password →
                        </a>
                    </p>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #2563eb;"><a href="%s">%s</a></p>
                    <p style="color: #64748b; font-size: 0.9em;">
                        <strong>Note:</strong> This password reset link will expire in %d minutes.
                    </p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                    <p style="color: #94a3b8; font-size: 0.85em;">
                        Security Note: If you did not request a password reset, please ignore this message. Your password will remain unchanged.
                    </p>
                </div>
            </body>
            </html>
            """.formatted(resetLink, resetLink, resetLink, expirationMinutes);

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    public void sendLoginNotificationEmail(String recipientEmail, String fullName) throws MessagingException {
        if (recipientEmail == null || recipientEmail.isBlank()) {
            throw new IllegalArgumentException("Recipient email cannot be empty");
        }

        String displayName = (fullName != null && !fullName.isBlank()) ? fullName.trim() : "Student";
        String loginTime = java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(recipientEmail.trim());
        helper.setSubject("CareerGuide - Security Alert: New Account Login");

        String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>New Account Login Alert</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <h2 style="color: #2563eb; margin-top: 0;">🎓 CareerGuide</h2>
                    <h3 style="color: #0b192c;">Security Alert: New Account Login</h3>
                    <p>Hello <strong>%s</strong>,</p>
                    <p>We detected a successful login to your CareerGuide account.</p>
                    <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 6px;">
                        <p style="margin: 0; color: #475569; font-size: 0.95em;">
                            <strong>Account Email:</strong> %s<br>
                            <strong>Timestamp:</strong> %s (Server Time)
                        </p>
                    </div>
                    <p style="color: #64748b; font-size: 0.9em;">
                        If this was you, no further action is required.
                    </p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                    <p style="color: #94a3b8; font-size: 0.85em;">
                        <strong>Security Note:</strong> If you did not log in to your account, please reset your password immediately to secure your account.
                    </p>
                </div>
            </body>
            </html>
            """.formatted(displayName, recipientEmail.trim(), loginTime);

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}
