import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Rootwills Trade Desk <onboarding@resend.dev>';

const REPLY_TO_EMAIL = 'sales@rootwills.co.uk';

let resendInstance: Resend | null = null;
try {
  resendInstance = new Resend(RESEND_API_KEY);
} catch (e) {
  console.error('[Resend Init Error]', e);
  resendInstance = null;
}

export interface SendApplicationEmailParams {
  applicantName: string;
  applicantEmail: string;
  company: string;
  phone: string;
  postcode: string;
  orderRef: string;
  accountTier?: string;
  approxWeeklySpend?: string;
  itemsCount?: number;
}

/**
 * Sends confirmation email to applicant and dispatch notice to sales team
 */
export async function sendApplicationEmails(params: SendApplicationEmailParams) {
  if (!resendInstance) {
    return {
      success: false,
      reason: 'RESEND_API_KEY not configured.',
    };
  }

  try {
    // 1. Send receipt confirmation to Applicant
    const applicantRes = await resendInstance.emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO_EMAIL,
      to: params.applicantEmail,
      subject: `Rootwills Wholesale Trade Application Received — Ref: ${params.orderRef}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18; background: #FAF7F2; padding: 32px; border-radius: 16px; border: 1px solid #E8DEC8;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2E060D; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">Rootwills Direct</h1>
            <p style="color: #BA8E4E; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 4px 0 0 0; font-weight: 600;">Food Services & Wholesale &bull; Birmingham Depot</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #E8DEC8; margin-bottom: 20px;">
            <span style="display: inline-block; padding: 3px 10px; border-radius: 20px; background: #FAF3EA; color: #8C6E12; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px;">Application Transmitted</span>
            <h2 style="color: #131313; margin: 0 0 8px 0; font-size: 20px;">Trade Account Request Received</h2>
            <p style="margin: 0; font-size: 13.5px; color: #555; line-height: 1.5;">Dear <strong>${params.applicantName}</strong>,</p>
            <p style="margin: 10px 0 0 0; font-size: 13.5px; color: #555; line-height: 1.5;">We have received your commercial application for <strong>${params.company}</strong>. Our logistics operations desk is reviewing your hospitality details.</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #E8DEC8; margin-bottom: 20px; font-size: 13px;">
            <p style="margin: 0 0 8px 0;"><strong>Application Reference:</strong> <code style="background: #FAF3EA; padding: 2px 6px; border-radius: 4px; color: #8C6E12; font-weight: bold;">${params.orderRef}</code></p>
            <p style="margin: 0 0 8px 0;"><strong>Registered Venue:</strong> ${params.company}</p>
            <p style="margin: 0 0 8px 0;"><strong>Delivery Postcode:</strong> ${params.postcode}</p>
            <p style="margin: 0;"><strong>Contact Phone:</strong> ${params.phone}</p>
          </div>

          <p style="font-size: 12.5px; color: #666; line-height: 1.5; margin-bottom: 24px;">Once verified, our team will issue your confidential Account ID and temporary password to access contracted wholesale pricing and next-day kitchen drops.</p>

          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #E8DEC8; font-size: 11.5px; color: #888;">
            <p style="margin: 0;">Rootwills Ltd &bull; Wholesale Produce Hub &bull; Birmingham, UK</p>
            <p style="margin: 4px 0 0 0;">Direct Desk WhatsApp: +44 7984 709478 &bull; <a href="https://www.rootwills.co.uk" style="color: #BA8E4E; text-decoration: none;">www.rootwills.co.uk</a></p>
          </div>
        </div>
      `,
    });

    return { success: true, applicantMessageId: applicantRes.data?.id };
  } catch (err: any) {
    console.error('[Resend Email Send Error]', err);
    return { success: false, error: err.message };
  }
}

export interface SendApprovedAccountEmailParams {
  applicantName: string;
  applicantEmail: string;
  company: string;
  assignedId: string;
  plainPassword: string;
  portalUrl: string;
}

/**
 * Sends approved login credentials to the customer
 */
export async function sendApprovedAccountEmail(params: SendApprovedAccountEmailParams) {
  if (!resendInstance) {
    return {
      success: false,
      reason: 'RESEND_API_KEY not configured.',
    };
  }

  try {
    const res = await resendInstance.emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO_EMAIL,
      to: params.applicantEmail,
      subject: `🎉 Your Rootwills Wholesale Account is Approved (${params.assignedId})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18; background: #FAF7F2; padding: 32px; border-radius: 16px; border: 1px solid #BA8E4E;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2E060D; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">Rootwills Direct</h1>
            <p style="color: #BA8E4E; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 4px 0 0 0; font-weight: 600;">Trade Hub &bull; Birmingham Depot</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #BA8E4E; margin-bottom: 20px;">
            <span style="display: inline-block; padding: 3px 10px; border-radius: 20px; background: #ECFDF5; color: #047857; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px;">Trade Account Approved</span>
            <h2 style="color: #131313; margin: 0 0 8px 0; font-size: 20px;">Welcome to Rootwills Direct</h2>
            <p style="margin: 0; font-size: 13.5px; color: #555; line-height: 1.5;">Dear <strong>${params.applicantName}</strong>,</p>
            <p style="margin: 10px 0 0 0; font-size: 13.5px; color: #555; line-height: 1.5;">Your wholesale commercial trading account for <strong>${params.company}</strong> has been officially approved.</p>
          </div>

          <div style="background: #FFFDF9; border-radius: 12px; padding: 22px; border: 2px dashed #BA8E4E; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0; font-size: 14px;"><strong>Ordering Portal:</strong> <a href="${params.portalUrl}" style="color: #4E0D17; font-weight: bold; text-decoration: underline;">${params.portalUrl}</a></p>
            <p style="margin: 0 0 12px 0; font-size: 14px;"><strong>Account ID / Username:</strong> <code style="background: #FAF3EA; padding: 4px 8px; border-radius: 6px; font-weight: bold; color: #2E060D; font-size: 15px;">${params.assignedId}</code></p>
            <p style="margin: 0; font-size: 14px;"><strong>Temporary Password:</strong> <code style="background: #FAF3EA; padding: 4px 8px; border-radius: 6px; font-weight: bold; color: #2E060D; font-size: 15px;">${params.plainPassword}</code></p>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${params.portalUrl}" style="display: inline-block; background: #2E060D; color: white; padding: 14px 28px; border-radius: 12px; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 14px rgba(46,6,13,0.25);">
              Sign In to Order Pad &rarr;
            </a>
          </div>

          <p style="font-size: 12.5px; color: #666; line-height: 1.5; margin-bottom: 24px;">You can now view contracted venue pricing, check stock levels, and place orders with pre-dawn next-day delivery across the West Midlands.</p>

          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #E8DEC8; font-size: 11.5px; color: #888;">
            <p style="margin: 0;">Rootwills Ltd &bull; Wholesale Produce Hub &bull; Birmingham, UK</p>
            <p style="margin: 4px 0 0 0;">Direct Desk WhatsApp: +44 7984 709478 &bull; <a href="https://www.rootwills.co.uk" style="color: #BA8E4E; text-decoration: none;">www.rootwills.co.uk</a></p>
          </div>
        </div>
      `,
    });
    return { success: true, messageId: res.data?.id };
  } catch (err: any) {
    console.error('[Resend Approved Email Error]', err);
    return { success: false, error: err.message };
  }
}
