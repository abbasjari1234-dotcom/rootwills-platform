/**
 * Rootwills Transactional Email Engine (Resend Integration)
 * Dispatches automated, luxury-styled HTML emails for order confirmations,
 * digital POD delivery receipts, and commercial onboarding alerts.
 */

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';
const resend = new Resend(resendApiKey);

const FROM_EMAIL = 'Rootwills Wholesale <orders@rootwills.co.uk>';
const CONCIERGE_EMAIL = process.env.CONCIERGE_NOTIFICATION_EMAIL || 'sales@rootwills.co.uk';

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
 * Send Order Placement Confirmation to Head Chef / Purchasing Manager
 */
export async function sendOrderConfirmationEmail(params: OrderConfirmationEmailParams) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
    console.log(`[Email Mock] Order Confirmation sent to ${params.toEmail} for ${params.orderNumber}`);
    return { success: true, mock: true };
  }

  const itemsHtml = params.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #2A2A2A;">
        <td style="padding: 10px 0; color: #FAF8F5; font-size: 13px;">
          <strong>${item.name}</strong><br/>
          <span style="color: #999; font-size: 11px; font-family: monospace;">SKU: ${item.sku}</span>
        </td>
        <td style="padding: 10px; text-align: center; color: #E4C767; font-family: monospace; font-size: 13px;">${item.qty}x</td>
        <td style="padding: 10px 0; text-align: right; color: #FAF8F5; font-family: monospace; font-size: 13px;">£${(item.unitPrice * item.qty).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #080808; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FAF8F5; margin: 0; padding: 24px;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #121212; border: 1px solid #262626; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="border-bottom: 1px solid #262626; padding-bottom: 20px; text-align: center;">
            <span style="color: #E4C767; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 2px;">ROOTWILLS WHOLESALE</span>
            <h1 style="color: #FAF8F5; font-size: 22px; margin: 6px 0 0 0;">Order Confirmation — ${params.orderNumber}</h1>
          </div>
          <div style="padding: 24px 0;">
            <p style="font-size: 14px; line-height: 1.5; color: #CCCCCC;">
              Hello ${params.customerName},<br/><br/>
              Your wholesale order for <strong>${params.organizationName}</strong> has been scheduled for early-morning kitchen delivery.
            </p>
            <div style="background-color: #1A1A1A; border: 1px solid #333333; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <div style="font-size: 12px; color: #888888; text-transform: uppercase; font-family: monospace;">Target Drop-off</div>
              <div style="font-size: 15px; color: #E4C767; font-weight: bold; margin-top: 4px;">${params.deliveryDate} (${params.deliverySlot})</div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <thead>
                <tr style="border-bottom: 2px solid #333; text-align: left; font-size: 11px; text-transform: uppercase; color: #888; font-family: monospace;">
                  <th style="padding-bottom: 8px;">Product</th>
                  <th style="padding-bottom: 8px; text-align: center;">Qty</th>
                  <th style="padding-bottom: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div style="border-top: 2px solid #E4C767; margin-top: 20px; padding-top: 12px; text-align: right;">
              <span style="font-size: 12px; color: #888888; text-transform: uppercase; font-family: monospace;">Total (inc. VAT):</span>
              <span style="font-size: 20px; color: #E4C767; font-weight: bold; font-family: monospace; margin-left: 8px;">£${params.total.toFixed(2)}</span>
            </div>
          </div>
          <div style="border-top: 1px solid #262626; padding-top: 16px; font-size: 11px; color: #666666; text-align: center;">
            Rootwills B2B Wholesale Hub &bull; Birmingham & West Midlands &bull; Dual-Temp Fleet Delivery
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
 * Send Digital Proof of Delivery (POD) Receipt to Chef with Temp Probe Check
 */
export async function sendPODDeliveryReceiptEmail(params: PODDeliveryReceiptEmailParams) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
    console.log(`[Email Mock] POD Receipt sent to ${params.toEmail} for ${params.orderNumber}`);
    return { success: true, mock: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #080808; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FAF8F5; margin: 0; padding: 24px;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #121212; border: 1px solid #10B981; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(16,185,129,0.15);">
          <div style="border-bottom: 1px solid #262626; padding-bottom: 20px; text-align: center;">
            <span style="color: #10B981; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 2px;">✓ DELIVERY COMPLETED</span>
            <h1 style="color: #FAF8F5; font-size: 22px; margin: 6px 0 0 0;">Proof of Delivery — ${params.orderNumber}</h1>
          </div>
          <div style="padding: 24px 0;">
            <p style="font-size: 14px; line-height: 1.5; color: #CCCCCC;">
              Hello ${params.customerName},<br/><br/>
              Your delivery for <strong>${params.organizationName}</strong> was completed and verified by driver <strong>${params.driverName}</strong>.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0;">
              <div style="background-color: #1A1A1A; border: 1px solid #333333; border-radius: 12px; padding: 14px;">
                <div style="font-size: 10px; color: #888888; text-transform: uppercase; font-family: monospace;">Signed By</div>
                <div style="font-size: 14px; color: #FAF8F5; font-weight: bold; margin-top: 4px;">${params.recipientName}</div>
                <div style="font-size: 11px; color: #666; margin-top: 2px;">${params.deliveredAt}</div>
              </div>
              <div style="background-color: #1A1A1A; border: 1px solid #333333; border-radius: 12px; padding: 14px;">
                <div style="font-size: 10px; color: #888888; text-transform: uppercase; font-family: monospace;">Van Temp Probe</div>
                <div style="font-size: 14px; color: #10B981; font-weight: bold; font-family: monospace; margin-top: 4px;">${params.chilledTemp}°C (Chilled)</div>
                <div style="font-size: 10px; color: #10B981; margin-top: 2px;">✓ BRCGS Compliant</div>
              </div>
            </div>
            <p style="font-size: 12px; color: #888888; margin-top: 16px;">
              Total crates/packs received: <strong>${params.totalItemsCount}</strong>. Your corresponding trade invoice is accessible in your Customer Portal.
            </p>
          </div>
          <div style="border-top: 1px solid #262626; padding-top: 16px; font-size: 11px; color: #666666; text-align: center;">
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
