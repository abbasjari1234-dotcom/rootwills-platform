import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const isResendConfigured =
  Boolean(RESEND_API_KEY) &&
  !RESEND_API_KEY?.includes('placeholder') &&
  RESEND_API_KEY?.startsWith('re_');

let resendInstance: Resend | null = null;
if (isResendConfigured && RESEND_API_KEY) {
  try {
    resendInstance = new Resend(RESEND_API_KEY);
  } catch {
    resendInstance = null;
  }
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
    // Graceful fallback when Resend is not yet linked in Vercel
    return {
      success: false,
      reason: 'RESEND_API_KEY not configured. Email logged to console and Supabase.',
    };
  }

  try {
    // 1. Send receipt confirmation to Applicant
    await resendInstance.emails.send({
      from: 'Rootwills Trade Desk <orders@rootwills.co.uk>',
      to: params.applicantEmail,
      subject: `Rootwills Wholesale Trade Application Received — Ref: ${params.orderRef}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18; background: #FAF7F2; padding: 32px; border-radius: 16px;">
          <h2 style="color: #2E060D; margin-top: 0;">Trade Account Application Received</h2>
          <p>Dear ${params.applicantName},</p>
          <p>Thank you for registering <strong>${params.company}</strong> for a commercial wholesale account with Rootwills Food Services.</p>
          <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #E8DEC8; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Application Reference:</strong> ${params.orderRef}</p>
            <p style="margin: 0 0 8px 0;"><strong>Venue / Company:</strong> ${params.company}</p>
            <p style="margin: 0 0 8px 0;"><strong>Delivery Postcode:</strong> ${params.postcode}</p>
            <p style="margin: 0;"><strong>Account Tier:</strong> ${params.accountTier || 'Trade Standard'}</p>
          </div>
          <p>Our Birmingham operations desk is reviewing your hospitality details. Once verified, you will receive your personal Trade Account ID and password to access bespoke kitchen pricing.</p>
          <p style="margin-top: 24px; font-size: 13px; color: #706C65;">Rootwills Ltd &bull; Birmingham Central Hub &bull; <a href="https://www.rootwills.co.uk" style="color: #BA8E4E;">www.rootwills.co.uk</a></p>
        </div>
      `,
    });

    // 2. Alert Rootwills Sales Desk
    const adminEmail = process.env.CONCIERGE_NOTIFICATION_EMAIL || 'sales@rootwills.co.uk';
    await resendInstance.emails.send({
      from: 'Rootwills System <system@rootwills.co.uk>',
      to: adminEmail,
      subject: `🚨 New Trade Application: ${params.company} (${params.applicantName})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h3>New Trade Customer Application Submitted</h3>
          <p><strong>Company:</strong> ${params.company}</p>
          <p><strong>Contact:</strong> ${params.applicantName} (${params.phone})</p>
          <p><strong>Email:</strong> ${params.applicantEmail}</p>
          <p><strong>Postcode:</strong> ${params.postcode}</p>
          <p><strong>Estimated Spend:</strong> ${params.approxWeeklySpend || 'N/A'}</p>
          <p>Review and approve in the internal portal: <a href="https://www.rootwills.co.uk/ops/crm">Launch Ops CRM</a></p>
        </div>
      `,
    });

    return { success: true };
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
    await resendInstance.emails.send({
      from: 'Rootwills Trade Desk <orders@rootwills.co.uk>',
      to: params.applicantEmail,
      subject: `🎉 Your Rootwills Wholesale Account is Approved (${params.assignedId})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18; background: #FAF7F2; padding: 32px; border-radius: 16px;">
          <h2 style="color: #2E060D; margin-top: 0;">Trade Account Approved</h2>
          <p>Dear ${params.applicantName},</p>
          <p>Your commercial wholesale account for <strong>${params.company}</strong> has been approved by our Birmingham logistics desk.</p>
          <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #BA8E4E; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Portal Sign-In:</strong> <a href="${params.portalUrl}" style="color: #4E0D17; font-weight: bold;">${params.portalUrl}</a></p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Account ID:</strong> <code style="background: #FAF3EA; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #8C6E12;">${params.assignedId}</code></p>
            <p style="margin: 0; font-size: 14px;"><strong>Temporary Password:</strong> <code style="background: #FAF3EA; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #8C6E12;">${params.plainPassword}</code></p>
          </div>
          <p>You can now sign in to view contracted venue pricing, check inventory, and place next-day morning delivery orders.</p>
          <p style="margin-top: 24px; font-size: 13px; color: #706C65;">Rootwills Ltd &bull; Birmingham Central Hub</p>
        </div>
      `,
    });
    return { success: true };
  } catch (err: any) {
    console.error('[Resend Approved Email Error]', err);
    return { success: false, error: err.message };
  }
}
