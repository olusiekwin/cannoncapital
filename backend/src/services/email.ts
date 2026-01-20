import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email configuration - Newsletter uses noreply, Contact uses inquiries
const newsletterConfig = {
  host: process.env.SMTP_HOST || 'server215.web-hosting.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER_NEWSLETTER || 'noreply@cannoncapitalpartners.org',
    pass: process.env.SMTP_PASSWORD_NEWSLETTER || process.env.SMTP_PASSWORD || '',
  },
};

const contactConfig = {
  host: process.env.SMTP_HOST || 'server215.web-hosting.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER_CONTACT || 'inquiries@cannoncapitalpartners.org',
    pass: process.env.SMTP_PASSWORD_CONTACT || process.env.SMTP_PASSWORD || '',
  },
};

// Create reusable transporters
const newsletterTransporter = nodemailer.createTransport(newsletterConfig);
const contactTransporter = nodemailer.createTransport(contactConfig);

// Verify email connection
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    await Promise.all([
      newsletterTransporter.verify(),
      contactTransporter.verify(),
    ]);
    console.log('✅ Email servers are ready to send messages');
    return true;
  } catch (error: any) {
    if (error.code === 'EAUTH') {
      console.error('❌ Email authentication failed: Incorrect username or password');
      console.error('   Please check your .env file:');
      console.error('   - SMTP_PASSWORD_NEWSLETTER (for noreply@)');
      console.error('   - SMTP_PASSWORD_CONTACT (for inquiries@)');
      console.error('   - SMTP_PASSWORD (fallback)');
      console.warn('   ⚠️  Server will continue running, but emails will not be sent until fixed.');
    } else {
      console.error('❌ Email server configuration error:', error.message);
      console.warn('   ⚠️  Server will continue running, but emails will not be sent until fixed.');
    }
    return false;
  }
};

// Get logo URL - use website URL from env or default
const getLogoUrl = () => {
  const websiteUrl = process.env.FRONTEND_URL || process.env.WEBSITE_URL || 'http://localhost:5173';
  return `${websiteUrl.replace(/\/$/, '')}/logo.svg`;
};

// Get unsubscribe URL for newsletter emails
const getUnsubscribeUrl = (email: string) => {
  const websiteUrl = process.env.FRONTEND_URL || process.env.WEBSITE_URL || 'http://localhost:5173';
  const baseUrl = websiteUrl.replace(/\/$/, '');
  // Encode email for URL - can be improved with token-based unsubscribe later
  return `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
};

// Professional email templates with modern design
export const emailTemplates = {
  newsletterWelcome: (email: string) => ({
    from: `"Cannon Capital Partners" <${newsletterConfig.auth.user}>`,
    to: email,
    subject: 'Welcome to Cannon Capital Partners Newsletter',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to Cannon Capital Partners</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
    .logo-img { max-width: 180px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; width: 100%;">
    <tr>
      <td align="center" style="padding: 0;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%); padding: 50px 40px 40px 40px; text-align: center;">
              <img src="${getLogoUrl()}" alt="Cannon Capital Partners" class="logo-img" style="max-width: 180px; height: auto; margin: 0 auto 25px auto; display: block; width: auto;" />
              <div style="border-top: 2px solid #C80000; width: 60px; margin: 0 auto 20px auto;"></div>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;">
                CANNON CAPITAL PARTNERS
              </h1>
              <p style="margin: 8px 0 0 0; color: #9f9f9f; font-family: 'Inter', Arial, sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Strategic Financial Advisory
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 60px 50px 50px 50px; background-color: #ffffff;">
              <!-- Greeting -->
              <h2 style="margin: 0 0 25px 0; color: #111111; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px;">
                Welcome Aboard!
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.7; font-weight: 400;">
                Dear Subscriber,
              </p>
              
              <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.7;">
                Thank you for subscribing to the <strong style="color: #111111; font-weight: 600;">Cannon Capital Partners</strong> newsletter. We're thrilled to have you join our exclusive community of forward-thinking investors and strategic partners.
              </p>
              
              <!-- Benefits Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 35px 0; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
                <tr>
                  <td style="padding: 35px 35px 30px 35px;">
                    <p style="margin: 0 0 20px 0; color: #111111; font-size: 18px; font-weight: 700; font-family: 'Sora', 'Inter', Arial, sans-serif; letter-spacing: -0.3px;">
                      What You'll Receive:
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                            <span style="color: #C80000; font-weight: 600; margin-right: 10px;">✓</span>
                            <strong style="color: #111111;">Latest Market Insights</strong> - Expert analysis and trends
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                            <span style="color: #C80000; font-weight: 600; margin-right: 10px;">✓</span>
                            <strong style="color: #111111;">Exclusive Opportunities</strong> - Early access to investments
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                            <span style="color: #C80000; font-weight: 600; margin-right: 10px;">✓</span>
                            <strong style="color: #111111;">Industry Intelligence</strong> - News and strategic updates
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0 0 0;">
                          <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                            <span style="color: #C80000; font-weight: 600; margin-right: 10px;">✓</span>
                            <strong style="color: #111111;">Service Updates</strong> - New offerings and project highlights
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 35px 0 0 0; color: #333333; font-size: 16px; line-height: 1.75;">
                We're committed to delivering valuable content that helps you make informed decisions and stay ahead of the curve.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 45px 0 40px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="display: inline-block; padding: 18px 45px; background-color: #C80000; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 15px; font-family: 'Inter', Arial, sans-serif; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2); transition: background-color 0.3s ease;">Visit Our Website</a>
                  </td>
                </tr>
              </table>
              
              <!-- Signature -->
              <div style="margin: 45px 0 0 0; padding-top: 30px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0 0 8px 0; color: #333333; font-size: 16px; line-height: 1.75;">
                  Best regards,
                </p>
                <p style="margin: 0; color: #C80000; font-size: 17px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                  The Cannon Capital Partners Team
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111111; padding: 45px 50px 40px 50px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                Canon Capital Partners LLC
              </p>
              <p style="margin: 0 0 25px 0; color: #9f9f9f; font-size: 12px; line-height: 1.6;">
                Professional Financial Advisory Services
              </p>
              <div style="border-top: 1px solid #333333; padding-top: 25px; margin-top: 25px;">
                <p style="margin: 0 0 12px 0; color: #9f9f9f; font-size: 12px; line-height: 1.8;">
                  <strong style="color: #ffffff;">Address:</strong><br>
                  Delta Corner, Westlands<br>
                  Nairobi, Kenya
                </p>
                <p style="margin: 0 0 8px 0;">
                  <a href="mailto:inquiries@cannoncapitalpartners.org" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin: 0 12px;">inquiries@cannoncapitalpartners.org</a>
                </p>
                <p style="margin: 0 0 8px 0;">
                  <a href="tel:+254730112028" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin: 0 8px;">+254 730 112 028</a>
                  <span style="color: #666666; font-size: 12px;">|</span>
                  <a href="tel:+254730112027" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin: 0 8px;">+254 730 112 027</a>
                </p>
              </div>
              <p style="margin: 28px 0 0 0; padding-top: 24px; border-top: 1px solid #333333; color: #9f9f9f; font-size: 11px; line-height: 1.6;">
                <a href="${getUnsubscribeUrl(email)}" style="color: #9f9f9f; text-decoration: underline;">Unsubscribe from this newsletter</a>
                <span style="color: #666666; margin: 0 12px;">|</span>
                <span>If you did not subscribe to this newsletter, please ignore this email.</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
Welcome to Cannon Capital Partners Newsletter!

Dear Subscriber,

Thank you for subscribing to the Cannon Capital Partners newsletter. We're thrilled to have you join our exclusive community of forward-thinking investors and strategic partners.

What You'll Receive:
✓ Latest Market Insights - Expert analysis and trends
✓ Exclusive Opportunities - Early access to investments
✓ Industry Intelligence - News and strategic updates
✓ Service Updates - New offerings and project highlights

We're committed to delivering valuable content that helps you make informed decisions and stay ahead of the curve.

Visit our website: ${process.env.FRONTEND_URL || 'http://localhost:5173'}

Best regards,
The Cannon Capital Partners Team

---
Canon Capital Partners LLC
Professional Financial Advisory Services

Address:
Delta Corner, Westlands
Nairobi, Kenya

Email: inquiries@cannoncapitalpartners.org
Phone: +254 730 112 028 | +254 730 112 027

Unsubscribe: ${getUnsubscribeUrl(email)}

If you did not subscribe to this newsletter, please ignore this email.
    `,
  }),

  contactConfirmation: (submission: {
    firstName: string;
    lastName: string;
    email: string;
    inquiryType: string;
  }) => ({
    from: `"Cannon Capital Partners" <${contactConfig.auth.user}>`,
    to: submission.email,
    subject: 'Thank You for Contacting Cannon Capital Partners',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You for Contacting Us</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
    .logo-img { max-width: 180px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; width: 100%;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%); padding: 50px 40px 40px 40px; text-align: center;">
              <img src="${getLogoUrl()}" alt="Cannon Capital Partners" class="logo-img" style="max-width: 180px; height: auto; margin: 0 auto 25px auto; display: block; width: auto;" />
              <div style="border-top: 2px solid #C80000; width: 60px; margin: 0 auto 20px auto;"></div>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;">
                CANNON CAPITAL PARTNERS
              </h1>
              <p style="margin: 8px 0 0 0; color: #9f9f9f; font-family: 'Inter', Arial, sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Strategic Financial Advisory
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 60px 50px 50px 50px; background-color: #ffffff;">
              <h2 style="margin: 0 0 25px 0; color: #111111; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px;">
                Thank You for Your Inquiry
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.7; font-weight: 400;">
                Dear ${submission.firstName} ${submission.lastName},
              </p>
              
              <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.7;">
                Thank you for contacting <strong style="color: #111111; font-weight: 600;">Cannon Capital Partners</strong>. We have received your inquiry regarding <strong style="color: #C80000;">${submission.inquiryType}</strong> and appreciate you taking the time to reach out to us.
              </p>
              
              <!-- Info Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; background: linear-gradient(135deg, #fff5f5 0%, #fafafa 100%); border-left: 4px solid #C80000; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td style="padding: 35px 40px;">
                    <p style="margin: 0 0 16px 0; color: #111111; font-size: 18px; font-weight: 700; font-family: 'Sora', 'Inter', Arial, sans-serif; letter-spacing: -0.3px;">
                      What Happens Next?
                    </p>
                    <p style="margin: 0 0 18px 0; color: #333333; font-size: 15px; line-height: 1.75;">
                      Our experienced team will carefully review your inquiry and respond to you within <strong style="color: #111111; font-weight: 600;">1-2 business days</strong>. We understand the importance of timely communication and are committed to providing you with the information you need.
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.7;">
                      For urgent matters, please call us directly at <a href="tel:+254730112028" style="color: #C80000; text-decoration: none; font-weight: 600;">+254 730 112 028</a>.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 45px 0 40px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/services" style="display: inline-block; padding: 18px 45px; background-color: #C80000; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 15px; font-family: 'Inter', Arial, sans-serif; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2);">Explore Our Services</a>
                  </td>
                </tr>
              </table>
              
              <!-- Signature -->
              <div style="margin: 45px 0 0 0; padding-top: 30px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0 0 8px 0; color: #333333; font-size: 16px; line-height: 1.75;">
                  Best regards,
                </p>
                <p style="margin: 0; color: #C80000; font-size: 17px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                  The Cannon Capital Partners Team
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111111; padding: 45px 50px 40px 50px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                Canon Capital Partners LLC
              </p>
              <p style="margin: 0 0 30px 0; color: #9f9f9f; font-size: 12px; line-height: 1.7;">
                Professional Financial Advisory Services
              </p>
              <div style="border-top: 1px solid #333333; padding-top: 28px; margin-top: 28px;">
                <p style="margin: 0 0 14px 0; color: #9f9f9f; font-size: 12px; line-height: 1.8;">
                  <strong style="color: #ffffff; font-weight: 600;">Address:</strong><br>
                  <span style="display: inline-block; margin-top: 4px;">Delta Corner, Westlands<br>Nairobi, Kenya</span>
                </p>
                <p style="margin: 0 0 10px 0;">
                  <a href="mailto:inquiries@cannoncapitalpartners.org" style="color: #9f9f9f; text-decoration: none; font-size: 12px; transition: color 0.2s ease;">inquiries@cannoncapitalpartners.org</a>
                </p>
                <p style="margin: 0;">
                  <a href="tel:+254730112028" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin-right: 12px;">+254 730 112 028</a>
                  <span style="color: #666666; font-size: 12px; margin: 0 8px;">|</span>
                  <a href="tel:+254730112027" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin-left: 8px;">+254 730 112 027</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
Thank You for Your Inquiry

Dear ${submission.firstName} ${submission.lastName},

Thank you for contacting Cannon Capital Partners. We have received your inquiry regarding ${submission.inquiryType} and appreciate you taking the time to reach out to us.

What Happens Next?
Our experienced team will carefully review your inquiry and respond to you within 1-2 business days. We understand the importance of timely communication and are committed to providing you with the information you need.

For urgent matters, please call us directly at +254 730 112 028.

Explore our services: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/services

Best regards,
The Cannon Capital Partners Team

---
Canon Capital Partners LLC
Professional Financial Advisory Services

Address:
Delta Corner, Westlands
Nairobi, Kenya

Email: inquiries@cannoncapitalpartners.org
Phone: +254 730 112 028 | +254 730 112 027
    `,
  }),

  contactNotification: (submission: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    inquiryType: string;
    message?: string;
  }) => ({
    from: `"Cannon Capital Partners" <${contactConfig.auth.user}>`,
    to: contactConfig.auth.user,
    subject: `New Contact Form Submission: ${submission.inquiryType}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Submission</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
    .logo-img { max-width: 180px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; width: 100%;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #C80000 0%, #a00000 100%); padding: 45px 40px 35px 40px; text-align: center;">
              <img src="${getLogoUrl()}" alt="Cannon Capital Partners" class="logo-img" style="max-width: 160px; height: auto; margin: 0 auto 20px auto; display: block; width: auto; filter: brightness(0) invert(1);" />
              <h1 style="margin: 0; color: #ffffff; font-family: 'Sora', Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 1px;">
                New Contact Form Submission
              </h1>
              <p style="margin: 12px 0 0 0; color: #ffffff; font-size: 13px; opacity: 0.9;">
                Action Required
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 50px 50px 40px 50px; background-color: #ffffff;">
              <p style="margin: 0 0 35px 0; color: #333333; font-size: 16px; line-height: 1.75; font-weight: 400;">
                You have received a new contact form submission from your website. Please review the details below and respond promptly.
              </p>
              
              <!-- Details Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td style="padding: 35px 40px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0 0 6px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Name</p>
                          <p style="margin: 0; color: #111111; font-size: 16px; font-weight: 600; line-height: 1.5;">${submission.firstName} ${submission.lastName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0 0 6px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Email</p>
                          <p style="margin: 0;"><a href="mailto:${submission.email}" style="color: #C80000; font-size: 16px; text-decoration: none; font-weight: 500;">${submission.email}</a></p>
                        </td>
                      </tr>
                      ${submission.phone ? `
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0 0 6px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Phone</p>
                          <p style="margin: 0;"><a href="tel:${submission.phone.replace(/\s/g, '')}" style="color: #111111; font-size: 16px; text-decoration: none; font-weight: 500;">${submission.phone}</a></p>
                        </td>
                      </tr>
                      ` : ''}
                      ${submission.company ? `
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0 0 6px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Company</p>
                          <p style="margin: 0; color: #111111; font-size: 16px; font-weight: 500;">${submission.company}</p>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #e5e5e5;">
                          <p style="margin: 0 0 6px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Inquiry Type</p>
                          <p style="margin: 0; color: #C80000; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${submission.inquiryType}</p>
                        </td>
                      </tr>
                      ${submission.message ? `
                      <tr>
                        <td style="padding: 14px 0 0 0;">
                          <p style="margin: 0 0 10px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Message</p>
                          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #C80000; border-radius: 4px; margin-top: 8px;">
                            <p style="margin: 0; color: #111111; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${submission.message.replace(/\n/g, '<br>')}</p>
                          </div>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Quick Action -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0 0 0;">
                <tr>
                  <td align="center">
                    <a href="mailto:${submission.email}?subject=Re: ${encodeURIComponent(submission.inquiryType)}" style="display: inline-block; padding: 16px 40px; background-color: #C80000; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 15px; font-family: 'Inter', Arial, sans-serif; letter-spacing: 0.3px; box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2);">Reply to ${submission.firstName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111111; padding: 40px 50px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 13px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                Canon Capital Partners LLC
              </p>
              <p style="margin: 0 0 24px 0; color: #9f9f9f; font-size: 11px; line-height: 1.7;">
                Professional Financial Advisory Services
              </p>
              <div style="border-top: 1px solid #333333; padding-top: 24px; margin-top: 24px;">
                <p style="margin: 0 0 12px 0; color: #9f9f9f; font-size: 11px; line-height: 1.7;">
                  <strong style="color: #ffffff; font-weight: 600;">Address:</strong><br>
                  <span style="display: inline-block; margin-top: 4px;">Delta Corner, Westlands<br>Nairobi, Kenya</span>
                </p>
                <p style="margin: 0 0 8px 0;">
                  <a href="mailto:inquiries@cannoncapitalpartners.org" style="color: #9f9f9f; text-decoration: none; font-size: 11px;">inquiries@cannoncapitalpartners.org</a>
                </p>
                <p style="margin: 0;">
                  <a href="tel:+254730112028" style="color: #9f9f9f; text-decoration: none; font-size: 11px; margin-right: 10px;">+254 730 112 028</a>
                  <span style="color: #666666; font-size: 11px; margin: 0 6px;">|</span>
                  <a href="tel:+254730112027" style="color: #9f9f9f; text-decoration: none; font-size: 11px; margin-left: 6px;">+254 730 112 027</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
New Contact Form Submission

You have received a new contact form submission from your website.

Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
${submission.phone ? `Phone: ${submission.phone}\n` : ''}${submission.company ? `Company: ${submission.company}\n` : ''}Inquiry Type: ${submission.inquiryType}
${submission.message ? `\nMessage:\n${submission.message}` : ''}

Reply to: ${submission.email}

---
Canon Capital Partners LLC
Professional Financial Advisory Services
Delta Corner, Westlands, Nairobi, Kenya
inquiries@cannoncapitalpartners.org | +254 730 112 028 | +254 730 112 027
    `,
  }),

  newsletter: (email: string, subject: string, content: string) => ({
    from: `"Cannon Capital Partners" <${newsletterConfig.auth.user}>`,
    to: email,
    subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${subject}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
    .logo-img { max-width: 180px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; width: 100%;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%); padding: 50px 40px 40px 40px; text-align: center;">
              <img src="${getLogoUrl()}" alt="Cannon Capital Partners" class="logo-img" style="max-width: 180px; height: auto; margin: 0 auto 25px auto; display: block; width: auto;" />
              <div style="border-top: 2px solid #C80000; width: 60px; margin: 0 auto 20px auto;"></div>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;">
                CANNON CAPITAL PARTNERS
              </h1>
              <p style="margin: 8px 0 0 0; color: #9f9f9f; font-family: 'Inter', Arial, sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Strategic Financial Advisory
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 60px 50px 50px 50px; background-color: #ffffff;">
              <div style="color: #333333; font-size: 16px; line-height: 1.8; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
                ${content}
              </div>
              
              <!-- Signature -->
              <div style="margin: 45px 0 0 0; padding-top: 30px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0 0 8px 0; color: #333333; font-size: 16px; line-height: 1.75;">
                  Best regards,
                </p>
                <p style="margin: 0; color: #C80000; font-size: 17px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                  The Cannon Capital Partners Team
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111111; padding: 45px 50px 40px 50px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                Canon Capital Partners LLC
              </p>
              <p style="margin: 0 0 30px 0; color: #9f9f9f; font-size: 12px; line-height: 1.7;">
                Professional Financial Advisory Services
              </p>
              <div style="border-top: 1px solid #333333; padding-top: 28px; margin-top: 28px;">
                <p style="margin: 0 0 14px 0; color: #9f9f9f; font-size: 12px; line-height: 1.8;">
                  <strong style="color: #ffffff; font-weight: 600;">Address:</strong><br>
                  <span style="display: inline-block; margin-top: 4px;">Delta Corner, Westlands<br>Nairobi, Kenya</span>
                </p>
                <p style="margin: 0 0 10px 0;">
                  <a href="mailto:inquiries@cannoncapitalpartners.org" style="color: #9f9f9f; text-decoration: none; font-size: 12px; transition: color 0.2s ease;">inquiries@cannoncapitalpartners.org</a>
                </p>
                <p style="margin: 0;">
                  <a href="tel:+254730112028" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin-right: 12px;">+254 730 112 028</a>
                  <span style="color: #666666; font-size: 12px; margin: 0 8px;">|</span>
                  <a href="tel:+254730112027" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin-left: 8px;">+254 730 112 027</a>
                </p>
              </div>
              <p style="margin: 28px 0 0 0; padding-top: 24px; border-top: 1px solid #333333; color: #9f9f9f; font-size: 11px; line-height: 1.6;">
                <a href="${getUnsubscribeUrl(email)}" style="color: #9f9f9f; text-decoration: underline;">Unsubscribe from this newsletter</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
${subject}

${content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')}

---
Canon Capital Partners LLC
Professional Financial Advisory Services

Address:
Delta Corner, Westlands
Nairobi, Kenya

Email: inquiries@cannoncapitalpartners.org
Phone: +254 730 112 028 | +254 730 112 027

Unsubscribe: ${getUnsubscribeUrl(email)}
    `,
  }),
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string,
  useContact: boolean = false
): Promise<boolean> => {
  try {
    const transporter = useContact ? contactTransporter : newsletterTransporter;
    const fromEmail = useContact ? contactConfig.auth.user : newsletterConfig.auth.user;
    
    const mailOptions = {
      from: `"Cannon Capital Partners" <${fromEmail}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email: string): Promise<boolean> => {
  const template = emailTemplates.newsletterWelcome(email);
  return sendEmail(email, template.subject, template.html, template.text, false);
};

// Send contact confirmation email
export const sendContactConfirmation = async (submission: {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
}): Promise<boolean> => {
  const template = emailTemplates.contactConfirmation(submission);
  return sendEmail(submission.email, template.subject, template.html, template.text, true);
};

// Send contact notification to admin
export const sendContactNotification = async (submission: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  inquiryType: string;
  message?: string;
}): Promise<boolean> => {
  const template = emailTemplates.contactNotification(submission);
  return sendEmail(contactConfig.auth.user, template.subject, template.html, template.text, true);
};

// Send newsletter email
export const sendNewsletter = async (email: string, subject: string, content: string): Promise<boolean> => {
  const template = emailTemplates.newsletter(email, subject, content);
  return sendEmail(email, template.subject, template.html, template.text, false);
};

// OTP Email Template
export const sendOTPEmail = async (email: string, otpCode: string, username: string): Promise<boolean> => {
  const template = {
    from: `"Cannon Capital Partners" <${newsletterConfig.auth.user}>`,
    to: email,
    subject: 'Admin Login OTP - Cannon Capital Partners',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Admin Login OTP</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
    .logo-img { max-width: 180px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; width: 100%;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%); padding: 50px 40px 40px 40px; text-align: center;">
              <img src="${getLogoUrl()}" alt="Cannon Capital Partners" class="logo-img" style="max-width: 180px; height: auto; margin: 0 auto 25px auto; display: block; width: auto;" />
              <div style="border-top: 2px solid #C80000; width: 60px; margin: 0 auto 20px auto;"></div>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;">
                CANNON CAPITAL PARTNERS
              </h1>
              <p style="margin: 8px 0 0 0; color: #9f9f9f; font-family: 'Inter', Arial, sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Admin Security Verification
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 60px 50px 50px 50px; background-color: #ffffff;">
              <h2 style="margin: 0 0 25px 0; color: #111111; font-family: 'Sora', 'Inter', Arial, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px;">
                Admin Login OTP
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.7; font-weight: 400;">
                Hello ${username},
              </p>
              
              <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.7;">
                A login attempt was made to your admin account. Please use the following One-Time Password (OTP) to complete your login:
              </p>
              
              <!-- OTP Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; background: linear-gradient(135deg, #fff5f5 0%, #fafafa 100%); border-left: 4px solid #C80000; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <p style="margin: 0 0 15px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Your One-Time Password
                    </p>
                    <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; display: inline-block; border: 2px solid #C80000;">
                      <p style="margin: 0; color: #C80000; font-size: 42px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 8px;">
                        ${otpCode}
                      </p>
                    </div>
                    <p style="margin: 20px 0 0 0; color: #666666; font-size: 13px; line-height: 1.6;">
                      This code will expire in <strong style="color: #111111;">10 minutes</strong>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Security Notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 35px 0; background-color: #fafafa; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
                <tr>
                  <td style="padding: 25px 30px;">
                    <p style="margin: 0 0 12px 0; color: #111111; font-size: 14px; font-weight: 700; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                      ⚠️ Security Notice
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 13px; line-height: 1.7;">
                      If you did not attempt to log in, please secure your account immediately and contact your system administrator.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Signature -->
              <div style="margin: 45px 0 0 0; padding-top: 30px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0 0 8px 0; color: #333333; font-size: 16px; line-height: 1.75;">
                  Best regards,
                </p>
                <p style="margin: 0; color: #C80000; font-size: 17px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                  Cannon Capital Partners Security System
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111111; padding: 45px 50px 40px 50px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 600; font-family: 'Sora', 'Inter', Arial, sans-serif;">
                Canon Capital Partners LLC
              </p>
              <p style="margin: 0 0 30px 0; color: #9f9f9f; font-size: 12px; line-height: 1.7;">
                Professional Financial Advisory Services
              </p>
              <div style="border-top: 1px solid #333333; padding-top: 28px; margin-top: 28px;">
                <p style="margin: 0 0 14px 0; color: #9f9f9f; font-size: 12px; line-height: 1.8;">
                  <strong style="color: #ffffff; font-weight: 600;">Address:</strong><br>
                  <span style="display: inline-block; margin-top: 4px;">Delta Corner, Westlands<br>Nairobi, Kenya</span>
                </p>
                <p style="margin: 0 0 10px 0;">
                  <a href="mailto:inquiries@cannoncapitalpartners.org" style="color: #9f9f9f; text-decoration: none; font-size: 12px; transition: color 0.2s ease;">inquiries@cannoncapitalpartners.org</a>
                </p>
                <p style="margin: 0;">
                  <a href="tel:+254730112028" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin-right: 12px;">+254 730 112 028</a>
                  <span style="color: #666666; font-size: 12px; margin: 0 8px;">|</span>
                  <a href="tel:+254730112027" style="color: #9f9f9f; text-decoration: none; font-size: 12px; margin-left: 8px;">+254 730 112 027</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
Admin Login OTP - Cannon Capital Partners

Hello ${username},

A login attempt was made to your admin account. Please use the following One-Time Password (OTP) to complete your login:

Your One-Time Password: ${otpCode}

This code will expire in 10 minutes.

⚠️ Security Notice
If you did not attempt to log in, please secure your account immediately and contact your system administrator.

Best regards,
Cannon Capital Partners Security System

---
Canon Capital Partners LLC
Professional Financial Advisory Services

Address:
Delta Corner, Westlands
Nairobi, Kenya

Email: inquiries@cannoncapitalpartners.org
Phone: +254 730 112 028 | +254 730 112 027
    `,
  };

  return sendEmail(email, template.subject, template.html, template.text, false);
};

export default { newsletterTransporter, contactTransporter };
