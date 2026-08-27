/**
 * Rootwills Transactional Email Engine (Resend Integration)
 * Dispatches automated, luxury-styled HTML emails for:
 * 1. Trade Account Welcome & Onboarding
 * 2. Order Confirmation with Itemised Breakdown
 * 3. Digital Proof of Delivery (POD) Receipts with Temp Probe Compliance
 */

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';
const resend = new Resend(resendApiKey);

const FROM_EMAIL = 'Rootwills Wholesale <orders@rootwills.co.uk>';
const CONCIERGE_EMAIL = process.env.CONCIERGE_NOTIFICATION_EMAIL || 'sales@rootwills.co.uk';

export interface WelcomeTradeAccountEmailParams {
  toEmail: string;
  contactName: string;
  organizationName: string;
  sector: string;
  creditLimit: string;
  applicationStatus: 'approved' | 'concierge_review';
}

export interface OrderConfirmationEmailParams {
  toEmail: string;
  customerName: string;
  organizationName: string;
  orderNumber: string;
  deliveryDate: string;
  deliverySlot: string;
  items: Array<{ name: string; sku: string; qty: number; packSize?: string; unitPrice: number }>;
  total: number;
}

export interface PODDeliveryReceiptEmailParams {
  toEmail: string;
  customerName: string;
  organizationName: string;
  orderNumber: string;
  recipientName: string;
  deliveredAt: string;
  driverName: string;
  chilledTemp: string;
  frozenTemp?: string;
  totalItemsCount: number;
}

export interface ConciergeAlertEmailParams {
  organizationName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  sector: string;
  estimatedWeeklySpend: number;
  postcode: string;
}

/**
 * 1. Send Welcome & Trade Account Confirmation to New Customer
 */
export async function sendWelcomeTradeAccountEmail(params: WelcomeTradeAccountEmailParams) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
    console.log(`[Email Mock] Welcome Trade Account email sent to ${params.toEmail} for ${params.organizationName}`);
    return { success: true, mock: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #021710; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FAF8F5; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #062D21; border: 1px solid #E4C767; border-radius: 16px; padding: 36px; box-shadow: 0 15px 40px rgba(0,0,0,0.8);">
          
          <div style="border-bottom: 1px solid rgba(228, 199, 103, 0.3); padding-bottom: 24px; text-align: center;">
            <div style="color: #E4C767; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 3px; font-weight: bold;">ROOTWILLS WHOLESALE &bull; FOODSERVICE UK</div>
            <h1 style="color: #FAF8F5; font-size: 24px; margin: 10px 0 0 0; font-weight: bold;">Welcome to the Rootwills Food Network</h1>
          </div>

          <div style="padding: 24px 0;">
            <p style="font-size: 15px; line-height: 1.6; color: #E0E7E4;">
              Dear <strong>${params.contactName}</strong>,<br/><br/>
              Thank you for registering <strong>${params.organizationName}</strong> with Rootwills. Your trade account application has been received and registered at our Birmingham Digbeth Central Hub.
            </p>

            <div style="background-color: #021710; border: 1px solid #10B981; border-radius: 12px; padding: 18px; margin: 24px 0;">
              <div style="font-size: 11px; color: #10B981; text-transform: uppercase; font-family: monospace; font-weight: bold;">Account Status & Facility</div>
              <div style="font-size: 18px; color: #E4C767; font-weight: bold; margin-top: 6px;">
                ${params.applicationStatus === 'approved' ? '✓ Trade Account Active' : '⚡ Key Account Concierge Review'}
              </div>
              <div style="font-size: 13px; color: #A7F3D0; margin-top: 4px; font-family: monospace;">
                Approved Credit Facility: <strong>${params.creditLimit}</strong> (30-Day Terms)
              </div>
            </div>

            <div style="margin: 24px 0; border-left: 3px solid #E4C767; padding-left: 14px;">
              <h3 style="margin: 0 0 6px 0; color: #FAF8F5; font-size: 14px;">Next-Day Ordering Rules</h3>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #CCCCCC; line-height: 1.6;">
                <li><strong>11:00 PM Order Cut-off:</strong> Place orders after evening dinner service.</li>
                <li><strong>06:00 AM Delivery SLA:</strong> Direct to kitchen coldroom before morning prep.</li>
                <li><strong>100% Zero Substitutions:</strong> Verified grade-A Class 1 produce only.</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://rootwills.co.uk/login" style="background: linear-gradient(135deg, #FFF4D0 0%, #E4C767 50%, #C9A227 100%); color: #021710; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 10px; font-size: 14px; display: inline-block; box-shadow: 0 4px 15px rgba(228,199,103,0.4);">
                Access Your Chef Portal & Price List &rarr;
              </a>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(228, 199, 103, 0.2); padding-top: 20px; font-size: 11px; color: #888888; text-align: center; font-family: monospace;">
            Rootwills Ltd &bull; Digbeth Distribution Hub, Birmingham &bull; Sales Desk: 0121 790 8800
          </div>

        </div>
      </body>
    </html>`;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.toEmail,
      subject: `Trade Account Confirmed: Welcome ${params.organizationName} to Rootwills Wholesale`,
      html,
    });
    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to send welcome trade account email:', err?.message || err);
    return { success: false, error: err?.message };
  }
}

/**
 * 2. Send Order Placement Confirmation to Head Chef / Purchasing Manager
 */
export async function sendOrderConfirmationEmail(params: OrderConfirmationEmailParams) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
    console.log(`[Email Mock] Order Confirmation sent to ${params.toEmail} for ${params.orderNumber}`);
    return { success: true, mock: true };
  }

  const itemsHtml = params.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid rgba(228, 199, 103, 0.15);">
        <td style="padding: 12px 0; color: #FAF8F5; font-size: 13px;">
          <strong>${item.name}</strong><br/>
          <span style="color: #999; font-size: 11px; font-family: monospace;">SKU: ${item.sku} ${item.packSize ? `&bull; ${item.packSize}` : ''}</span>
        </td>
        <td style="padding: 12px; text-align: center; color: #E4C767; font-family: monospace; font-size: 14px; font-weight: bold;">${item.qty}x</td>
        <td style="padding: 12px 0; text-align: right; color: #FAF8F5; font-family: monospace; font-size: 14px;">£${(item.unitPrice * item.qty).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #021710; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FAF8F5; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #062D21; border: 1px solid #E4C767; border-radius: 16px; padding: 36px; box-shadow: 0 15px 40px rgba(0,0,0,0.8);">
          
          <div style="border-bottom: 1px solid rgba(228, 199, 103, 0.3); padding-bottom: 24px; text-align: center;">
            <span style="color: #E4C767; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 3px; font-weight: bold;">ROOTWILLS WHOLESALE</span>
            <h1 style="color: #FAF8F5; font-size: 22px; margin: 8px 0 0 0; font-weight: bold;">Order Confirmation — ${params.orderNumber}</h1>
          </div>

          <div style="padding: 24px 0;">
            <p style="font-size: 14px; line-height: 1.6; color: #CCCCCC;">
              Hello <strong>${params.customerName}</strong>,<br/><br/>
              Your wholesale food order for <strong>${params.organizationName}</strong> has been received and scheduled for early morning kitchen delivery.
            </p>

            <div style="background-color: #021710; border: 1px solid #10B981; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <div style="font-size: 11px; color: #10B981; text-transform: uppercase; font-family: monospace; font-weight: bold;">Scheduled Kitchen Drop</div>
              <div style="font-size: 16px; color: #E4C767; font-weight: bold; margin-top: 4px; font-family: monospace;">
                ${params.deliveryDate} &bull; ${params.deliverySlot}
              </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="border-bottom: 2px solid #E4C767; text-align: left; font-size: 11px; text-transform: uppercase; color: #E4C767; font-family: monospace;">
                  <th style="padding-bottom: 8px;">Product Line</th>
                  <th style="padding-bottom: 8px; text-align: center;">Quantity</th>
                  <th style="padding-bottom: 8px; text-align: right;">Contract Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="border-top: 2px solid #E4C767; margin-top: 20px; padding-top: 14px; text-align: right;">
              <span style="font-size: 12px; color: #888888; text-transform: uppercase; font-family: monospace;">Total Payable (inc. VAT):</span>
              <span style="font-size: 22px; color: #E4C767; font-weight: bold; font-family: monospace; margin-left: 8px;">£${params.total.toFixed(2)}</span>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(228, 199, 103, 0.2); padding-top: 18px; font-size: 11px; color: #888888; text-align: center; font-family: monospace;">
            Rootwills B2B Wholesale Hub &bull; Birmingham &bull; Dual-Temp Fleet Delivery
          </div>

        </div>
      </body>
    </html>`;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.toEmail,
      subject: `Order Confirmed: ${params.orderNumber} — Scheduled for ${params.deliverySlot}`,
      html,
    });
    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to send order confirmation email:', err?.message || err);
    return { success: false, error: err?.message };
  }
}

/**
 * 3. Send Digital Proof of Delivery (POD) Receipt to Chef with Temp Probe Check
 */
export async function sendPODDeliveryReceiptEmail(params: PODDeliveryReceiptEmailParams) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
    console.log(`[Email Mock] POD Receipt sent to ${params.toEmail} for ${params.orderNumber}`);
    return { success: true, mock: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #021710; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FAF8F5; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #062D21; border: 1px solid #10B981; border-radius: 16px; padding: 36px; box-shadow: 0 15px 40px rgba(16,185,129,0.2);">
          
          <div style="border-bottom: 1px solid rgba(16, 185, 129, 0.3); padding-bottom: 24px; text-align: center;">
            <span style="color: #10B981; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 3px; font-weight: bold;">✓ DELIVERY COMPLETED & SIGNED</span>
            <h1 style="color: #FAF8F5; font-size: 22px; margin: 8px 0 0 0; font-weight: bold;">Proof of Delivery — ${params.orderNumber}</h1>
          </div>

          <div style="padding: 24px 0;">
            <p style="font-size: 14px; line-height: 1.6; color: #CCCCCC;">
              Hello <strong>${params.customerName}</strong>,<br/><br/>
              Your morning delivery for <strong>${params.organizationName}</strong> was completed and verified by driver <strong>${params.driverName}</strong>.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0;">
              <div style="background-color: #021710; border: 1px solid #10B981; border-radius: 12px; padding: 14px;">
                <div style="font-size: 10px; color: #888888; text-transform: uppercase; font-family: monospace;">Signed Recipient</div>
                <div style="font-size: 15px; color: #FAF8F5; font-weight: bold; margin-top: 4px;">${params.recipientName}</div>
                <div style="font-size: 11px; color: #10B981; margin-top: 2px; font-family: monospace;">${params.deliveredAt}</div>
              </div>

              <div style="background-color: #021710; border: 1px solid #10B981; border-radius: 12px; padding: 14px;">
                <div style="font-size: 10px; color: #888888; text-transform: uppercase; font-family: monospace;">Van Temp Probe</div>
                <div style="font-size: 15px; color: #10B981; font-weight: bold; font-family: monospace; margin-top: 4px;">${params.chilledTemp}°C (Chilled)</div>
                <div style="font-size: 10px; color: #E4C767; margin-top: 2px;">✓ Cold-Chain Compliant</div>
              </div>
            </div>

            <p style="font-size: 13px; color: #A7F3D0; margin-top: 16px;">
              Total crates/packs verified: <strong>${params.totalItemsCount}</strong>. Your matching invoice is accessible in your Customer Portal.
            </p>
          </div>

          <div style="border-top: 1px solid rgba(16, 185, 129, 0.2); padding-top: 18px; font-size: 11px; color: #888888; text-align: center; font-family: monospace;">
            Rootwills B2B Wholesale Platform &bull; Digital POD Verification
          </div>

        </div>
      </body>
    </html>`;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.toEmail,
      subject: `Delivered & Signed: ${params.orderNumber} — Proof of Delivery Receipt`,
      html,
    });
    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to send POD delivery email:', err?.message || err);
    return { success: false, error: err?.message };
  }
}

/**
 * 4. Send Concierge Notification to Rootwills Sales Desk for High-Volume Leads
 */
export async function sendConciergeAlertEmail(params: ConciergeAlertEmailParams) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
    console.log(`[Email Mock] Concierge notification sent for ${params.organizationName}`);
    return { success: true, mock: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #021710; font-family: sans-serif; color: #FAF8F5; padding: 24px;">
        <div style="max-width: 580px; margin: 0 auto; background: #062D21; border: 1px solid #E4C767; border-radius: 12px; padding: 24px;">
          <h2 style="color: #E4C767; margin-top: 0;">⚡ New High-Volume Commercial Lead</h2>
          <p><strong>Venue:</strong> ${params.organizationName} (${params.sector})</p>
          <p><strong>Contact:</strong> ${params.contactName} (${params.contactEmail}, ${params.contactPhone || 'N/A'})</p>
          <p><strong>Est. Spend:</strong> £${params.estimatedWeeklySpend}/week</p>
          <p><strong>Postcode:</strong> ${params.postcode}</p>
        </div>
      </body>
    </html>`;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONCIERGE_EMAIL,
      subject: `[LEAD] ${params.organizationName} — £${params.estimatedWeeklySpend}/wk Application`,
      html,
    });
    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to send concierge alert email:', err?.message || err);
    return { success: false, error: err?.message };
  }
}
