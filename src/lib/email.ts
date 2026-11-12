import { Resend } from 'resend';

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Rootwills Trade Desk <orders@rootwills.co.uk>';

const REPLY_TO_EMAIL = 'sales@rootwills.co.uk';

const LOGO_URL = 'https://www.rootwills.co.uk/images/logo.png';

let resendInstance: Resend | null = null;
let currentKey: string = '';

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY || '';
  if (!key || key.includes('placeholder')) {
    return null;
  }
  if (!resendInstance || currentKey !== key) {
    try {
      resendInstance = new Resend(key);
      currentKey = key;
    } catch (e) {
      console.error('[Resend Init Error]', e);
      resendInstance = null;
    }
  }
  return resendInstance;
}

export interface SendApplicationEmailParams {
  applicantName: string;
  applicantEmail: string;
  company: string;
  phone: string;
  postcode: string;
  orderRef: string;
  jobTitle?: string;
  numberOfSites?: string;
  currentSupplier?: string;
  approxWeeklyDeliveries?: string;
  approxWeeklySpend?: string;
  message?: string;
  accountTier?: string;
  items?: any[];
  itemsCount?: number;
  totalCases?: number;
  subtotalNet?: number;
  grandTotal?: number;
}

/**
 * Sends both the internal Rootwills executive manifest AND the applicant receipt email
 */
export async function sendApplicationEmails(params: SendApplicationEmailParams) {
  const resend = getResendClient();
  if (!resend) {
    return {
      success: false,
      reason: 'RESEND_API_KEY not configured.',
    };
  }

  const cleanPhone = (params.phone || '').replace(/[^0-9]/g, '');
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(params.applicantName)}%2C%20this%20is%20Rootwills%20Wholesale%20Depot%20regarding%20your%20commercial%20application%20for%20${encodeURIComponent(params.company)}.`
    : `https://wa.me/?text=Hello%20${encodeURIComponent(params.applicantName)}%2C%20this%20is%20Rootwills%20Wholesale%20Depot.`;

  // 1. EXECUTIVE MANIFEST FOR ROOTWILLS DESK
  const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Customer Application</title></head>
<body style="margin: 0; padding: 0; background-color: #F5F1EB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F1EB; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E5DCCF; box-shadow: 0 12px 36px rgba(46,6,13,0.07);">
          
          <!-- BRAND HEADER WITH MASTER LOGO -->
          <tr>
            <td style="background: linear-gradient(135deg, #4E0D17 0%, #2E060D 100%); padding: 34px 28px; text-align: center; color: #FFFFFF;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <img src="${LOGO_URL}" alt="Rootwills Logo" width="76" height="76" style="display: block; border-radius: 50%; border: 2px solid #BA8E4E; background-color: #FAF7F2; padding: 4px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.35);" />
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; text-transform: uppercase;">ROOTWILLS</h1>
                    <p style="margin: 5px 0 0 0; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #F3D08A;">CENTRAL WHOLESALE LOGISTICS &bull; TRADE DESK</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PRIORITY BANNER -->
          <tr>
            <td style="background-color: #FAF3EA; padding: 14px 28px; border-bottom: 1px solid #E8DEC8;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 20px; background-color: #8C6E12; color: #FFFFFF; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;">NEW TRADE APPLICATION</span>
                    <span style="font-size: 13px; font-weight: 700; color: #2E060D; margin-left: 8px;">Ref: ${params.orderRef}</span>
                  </td>
                  <td align="right" style="font-size: 11px; color: #8C6E12; font-weight: 700;">Requires Ops Review</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MANIFEST TABLE BODY -->
          <tr>
            <td style="padding: 28px 28px 20px 28px;">
              <p style="margin: 0 0 16px 0; font-size: 13.5px; color: #4A4A4A; line-height: 1.5;">
                A new commercial venue has submitted their onboarding application on the web portal. Review all account fields below to configure pricing terms and delivery routing:
              </p>

              <!-- COMPLETE ONBOARDING DATA TABLE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #EBE5DB; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #8C6E12; border-bottom: 1px solid #EBE5DB; width: 40%;">Company / Venue Name</td>
                  <td style="padding: 11px 14px; font-size: 14px; font-weight: 800; color: #2E060D; border-bottom: 1px solid #EBE5DB;">${params.company}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Contact Person &amp; Role</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.applicantName} (${params.jobTitle || 'Chef / Buyer'})</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Direct Phone</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 700; color: #4E0D17; border-bottom: 1px solid #EBE5DB;">
                    <a href="tel:${params.phone}" style="color: #4E0D17; text-decoration: none;">${params.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Direct Email</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">
                    <a href="mailto:${params.applicantEmail}" style="color: #4E0D17; text-decoration: none;">${params.applicantEmail}</a>
                  </td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Delivery Postcode</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 700; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.postcode} (${params.numberOfSites || '1'} site location)</td>
                </tr>
                <tr>
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Current Foodservice Supplier</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.currentSupplier || 'Not specified'}</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Requested Weekly Deliveries</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.approxWeeklyDeliveries || 'Daily morning delivery'}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Approx Weekly Spend / Budget</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 800; color: #047857; border-bottom: 1px solid #EBE5DB;">${params.approxWeeklySpend ? `£${params.approxWeeklySpend}` : 'Trade Quote'}</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Account Tier</td>
                  <td style="padding: 11px 14px; font-size: 13px; font-weight: 700; color: #8C6E12; border-bottom: 1px solid #EBE5DB;">${params.accountTier || 'Wholesale Trade Direct'}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65;">Kitchen Notes / Special Request</td>
                  <td style="padding: 11px 14px; font-size: 13px; color: #4A4A4A; font-style: italic;">${params.message || 'No additional notes provided'}</td>
                </tr>
              </table>

              ${Array.isArray(params.items) && params.items.length > 0 ? `
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #2E060D;">Requested Order Pad Items (${params.items.length}):</h3>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #EBE5DB; border-radius: 8px; overflow: hidden; font-size: 12px;">
                  <tr style="background-color: #FAF9F7; font-weight: 700; color: #8C6E12; font-size: 10px; text-transform: uppercase;">
                    <th align="left" style="padding: 8px 12px; border-bottom: 1px solid #EBE5DB;">Product</th>
                    <th align="center" style="padding: 8px 12px; border-bottom: 1px solid #EBE5DB;">Pack</th>
                    <th align="center" style="padding: 8px 12px; border-bottom: 1px solid #EBE5DB;">Qty</th>
                    <th align="right" style="padding: 8px 12px; border-bottom: 1px solid #EBE5DB;">Price</th>
                  </tr>
                  ${params.items.map((it: any) => `
                    <tr>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #F0ECE4; color: #1A1A18;"><strong>${it.name || it.sku}</strong></td>
                      <td align="center" style="padding: 8px 12px; border-bottom: 1px solid #F0ECE4; color: #666;">${it.packSize || '-'}</td>
                      <td align="center" style="padding: 8px 12px; border-bottom: 1px solid #F0ECE4; color: #2E060D; font-weight: 700;">${it.qty || 1}</td>
                      <td align="right" style="padding: 8px 12px; border-bottom: 1px solid #F0ECE4; color: #2E060D; font-weight: 700;">${it.unitPrice ? `£${(it.linePrice || it.unitPrice * it.qty).toFixed(2)}` : 'Trade Quote'}</td>
                    </tr>
                  `).join('')}
                </table>
                ${params.grandTotal ? `
                  <div style="text-align: right; padding-top: 8px; font-size: 13px; font-weight: 800; color: #2E060D;">
                    Estimated Order Value: £${params.grandTotal.toFixed(2)}
                  </div>
                ` : ''}
              </div>
              ` : ''}

              <!-- ACTION BUTTONS -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                <tr>
                  <td align="center" style="padding-bottom: 10px;">
                    <a href="https://www.rootwills.co.uk/ops/crm" style="display: block; width: 100%; box-sizing: border-box; background-color: #2E060D; color: #FFFFFF; font-size: 13px; font-weight: 800; text-decoration: none; padding: 15px 24px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.08em; text-align: center; box-shadow: 0 4px 14px rgba(46,6,13,0.25);">
                      Launch Ops CRM &amp; Issue Login &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${whatsappUrl}" style="display: block; width: 100%; box-sizing: border-box; background-color: #059669; color: #FFFFFF; font-size: 12.5px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 12px; text-align: center;">
                      Chat with ${params.applicantName} on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #FAF7F2; padding: 20px 28px; text-align: center; border-top: 1px solid #E8DEC8; font-size: 11px; color: #888888;">
              <p style="margin: 0;">Rootwills Ltd &bull; 10 Central Hub, Birmingham Wholesale Market &bull; +44 16164 12803</p>
              <p style="margin: 4px 0 0 0;">Internal Dispatch Alert &bull; Confidential Commercial Data &bull; <a href="https://www.rootwills.co.uk" style="color: #BA8E4E; text-decoration: none;">www.rootwills.co.uk</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // 2. FORMAL RECEIPT EMAIL FOR THE APPLICANT
  const applicantHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Application Received</title></head>
<body style="margin: 0; padding: 0; background-color: #F5F1EB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F1EB; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E5DCCF; box-shadow: 0 12px 36px rgba(46,6,13,0.07);">
          
          <!-- BRAND HEADER WITH MASTER LOGO -->
          <tr>
            <td style="background: linear-gradient(135deg, #4E0D17 0%, #2E060D 100%); padding: 34px 28px; text-align: center; color: #FFFFFF;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <img src="${LOGO_URL}" alt="Rootwills Logo" width="76" height="76" style="display: block; border-radius: 50%; border: 2px solid #BA8E4E; background-color: #FAF7F2; padding: 4px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.35);" />
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; text-transform: uppercase;">ROOTWILLS DIRECT</h1>
                    <p style="margin: 5px 0 0 0; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #F3D08A;">FOOD SERVICES &bull; WHOLESALE &bull; BIRMINGHAM DEPOT</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SLIP CARD -->
          <tr>
            <td style="padding: 28px 28px 20px 28px;">
              <div style="background-color: #FAF3EA; border-radius: 12px; padding: 18px 22px; border: 1px solid #E8DEC8; margin-bottom: 22px;">
                <span style="display: inline-block; padding: 3px 10px; border-radius: 20px; background-color: #8C6E12; color: #FFFFFF; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Application Transmitted</span>
                <h2 style="margin: 0 0 6px 0; font-size: 19px; color: #2E060D; font-weight: 800;">Trade Account Request Received</h2>
                <p style="margin: 0; font-size: 13.5px; color: #5C4524; line-height: 1.5;">Dear <strong>${params.applicantName}</strong>,</p>
                <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #5C4524; line-height: 1.5;">Thank you for registering <strong>${params.company}</strong> for commercial wholesale food services with Rootwills.</p>
              </div>

              <!-- RECEIPT SUMMARY TABLE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #EBE5DB; border-radius: 12px; overflow: hidden; margin-bottom: 22px;">
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #8C6E12; border-bottom: 1px solid #EBE5DB; width: 42%;">Application Reference</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 800; color: #2E060D; border-bottom: 1px solid #EBE5DB;">${params.orderRef}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Registered Venue</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 800; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.company}</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Primary Contact &amp; Role</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.applicantName} (${params.jobTitle || 'Chef / Buyer'})</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Direct Phone &amp; Email</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.phone} &bull; ${params.applicantEmail}</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Delivery Postcode &amp; Sites</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.postcode} (${params.numberOfSites || '1'} site location)</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Current Foodservice Supplier</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.currentSupplier || 'Not specified'}</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Requested Weekly Deliveries</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #1A1A18; border-bottom: 1px solid #EBE5DB;">${params.approxWeeklyDeliveries || 'Daily morning delivery'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Approx Weekly Spend / Budget</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 800; color: #047857; border-bottom: 1px solid #EBE5DB;">${params.approxWeeklySpend ? `£${params.approxWeeklySpend}` : 'Trade Quote Terms'}</td>
                </tr>
                <tr style="background-color: #FAF9F7;">
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65; border-bottom: 1px solid #EBE5DB;">Pricing Tier</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #8C6E12; border-bottom: 1px solid #EBE5DB;">${params.accountTier || 'Wholesale Trade Direct'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #706C65;">Kitchen Notes / Special Request</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #4A4A4A; font-style: italic;">${params.message || 'No additional notes provided'}</td>
                </tr>
              </table>

              <!-- WHAT HAPPENS NEXT -->
              <div style="background-color: #FAF9F7; border-radius: 12px; padding: 18px 20px; border: 1px solid #EBE5DB; margin-bottom: 22px;">
                <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #2E060D;">What Happens Next</h3>
                <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #555555; line-height: 1.5;">1. Our Birmingham logistics desk reviews venue delivery access and credit terms.</p>
                <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #555555; line-height: 1.5;">2. You will receive an official approval email &amp; WhatsApp message containing your <strong>Account ID</strong> and temporary password.</p>
                <p style="margin: 0; font-size: 12.5px; color: #555555; line-height: 1.5;">3. You can immediately access contracted kitchen pricing and place daily orders with pre-dawn drop times.</p>
              </div>

              <!-- SUPPORT CONTACTS -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/447984709478?text=Hello%20Rootwills%2C%20I%20have%20submitted%20trade%20application%20ref%20${params.orderRef}." style="display: block; width: 100%; box-sizing: border-box; background-color: #059669; color: #FFFFFF; font-size: 12.5px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 12px; text-align: center;">
                      Message Birmingham Trade Desk on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #FAF7F2; padding: 20px 28px; text-align: center; border-top: 1px solid #E8DEC8; font-size: 11px; color: #888888;">
              <p style="margin: 0;">Rootwills Ltd &bull; 10 Central Hub, Birmingham Wholesale Market &bull; +44 16164 12803</p>
              <p style="margin: 4px 0 0 0;"><a href="https://www.rootwills.co.uk" style="color: #BA8E4E; text-decoration: none;">www.rootwills.co.uk</a> &bull; Dedicated to Commercial Hospitality</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    // A) Send Internal Manifest strictly to Rootwills official inbox (sales@rootwills.co.uk)
    const adminRecipients = Array.from(
      new Set(
        [
          process.env.INTERNAL_SALES_EMAIL || 'sales@rootwills.co.uk',
          process.env.CONCIERGE_NOTIFICATION_EMAIL,
        ].filter(Boolean) as string[]
      )
    );

    await resend.emails.send({
      from: FROM_EMAIL,
      reply_to: params.applicantEmail,
      to: adminRecipients,
      subject: `📋 New Trade Application: ${params.company} (${params.applicantName}) — Ref: ${params.orderRef}`,
      html: adminHtml,
    }).catch((e) => console.error('[Resend Admin Notice Error]', e));

    // C) Send Receipt to the Applicant
    const applicantRes = await resend.emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO_EMAIL,
      to: params.applicantEmail,
      subject: `Rootwills Wholesale Trade Application Received — Ref: ${params.orderRef}`,
      html: applicantHtml,
    }).catch((e) => {
      console.log('[Resend Applicant Notice]', e.message);
      return { data: null };
    });

    return { success: true, applicantMessageId: applicantRes?.data?.id };
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
 * Sends approved login credentials to the customer with master logo and gold credentials card
 */
export async function sendApprovedAccountEmail(params: SendApprovedAccountEmailParams) {
  const resend = getResendClient();
  if (!resend) {
    return {
      success: false,
      reason: 'RESEND_API_KEY not configured.',
    };
  }

  const approvedHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Account Approved</title></head>
<body style="margin: 0; padding: 0; background-color: #F5F1EB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F1EB; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #BA8E4E; box-shadow: 0 14px 40px rgba(46,6,13,0.1);">
          
          <!-- BRAND HEADER WITH MASTER LOGO -->
          <tr>
            <td style="background: linear-gradient(135deg, #4E0D17 0%, #2E060D 100%); padding: 36px 28px; text-align: center; color: #FFFFFF;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <img src="${LOGO_URL}" alt="Rootwills Logo" width="80" height="80" style="display: block; border-radius: 50%; border: 2px solid #BA8E4E; background-color: #FAF7F2; padding: 4px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.35);" />
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; text-transform: uppercase;">ROOTWILLS DIRECT</h1>
                    <p style="margin: 5px 0 0 0; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #F3D08A;">WHOLESALE FOOD SERVICES &bull; BIRMINGHAM DEPOT</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- APPROVAL HERO -->
          <tr>
            <td style="padding: 30px 28px 24px 28px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-block; padding: 4px 14px; border-radius: 20px; background-color: #ECFDF5; color: #047857; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid #A7F3D0;">Trade Account Activated</span>
                <h2 style="margin: 10px 0 6px 0; font-size: 22px; color: #2E060D; font-weight: 800;">Welcome to Wholesale Direct</h2>
                <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.5;">Dear <strong>${params.applicantName}</strong>,</p>
                <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #555555; line-height: 1.5;">Your commercial wholesale ordering account for <strong>${params.company}</strong> has been approved by our Birmingham logistics operations desk.</p>
              </div>

              <!-- LUXURY GOLD CREDENTIALS CARD -->
              <div style="background-color: #FFFDF9; border-radius: 14px; padding: 24px; border: 2px dashed #BA8E4E; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; font-size: 13.5px; color: #666666;">
                  <strong style="color: #2E060D;">Ordering Portal:</strong><br />
                  <a href="${params.portalUrl}" style="color: #4E0D17; font-weight: 800; font-size: 14px; text-decoration: underline;">${params.portalUrl}</a>
                </p>
                <p style="margin: 0 0 12px 0; font-size: 13.5px; color: #666666;">
                  <strong style="color: #2E060D;">Account ID / Username:</strong><br />
                  <code style="display: inline-block; margin-top: 4px; background-color: #FAF3EA; padding: 6px 12px; border-radius: 6px; font-weight: 800; color: #2E060D; font-size: 16px; font-family: monospace; letter-spacing: 0.05em; border: 1px solid #E8DEC8;">${params.assignedId}</code>
                </p>
                <p style="margin: 0; font-size: 13.5px; color: #666666;">
                  <strong style="color: #2E060D;">Temporary Password:</strong><br />
                  <code style="display: inline-block; margin-top: 4px; background-color: #FAF3EA; padding: 6px 12px; border-radius: 6px; font-weight: 800; color: #2E060D; font-size: 16px; font-family: monospace; letter-spacing: 0.05em; border: 1px solid #E8DEC8;">${params.plainPassword}</code>
                </p>
              </div>

              <!-- SIGN IN BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${params.portalUrl}" style="display: inline-block; background-color: #2E060D; color: #FFFFFF; font-size: 13.5px; font-weight: 800; text-decoration: none; padding: 15px 36px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.08em; box-shadow: 0 6px 18px rgba(46,6,13,0.3);">
                      Sign In to Kitchen Order Pad &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 12.5px; color: #666666; line-height: 1.5; margin: 0 0 16px 0; text-align: center;">
                You can now view contracted venue pricing, check real-time stock levels, and place orders with guaranteed pre-dawn next-day delivery.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #FAF7F2; padding: 20px 28px; text-align: center; border-top: 1px solid #E8DEC8; font-size: 11px; color: #888888;">
              <p style="margin: 0;">Rootwills Ltd &bull; 10 Central Hub, Birmingham Wholesale Market &bull; +44 16164 12803</p>
              <p style="margin: 4px 0 0 0;">Dedicated to High-Volume Hospitality &bull; <a href="https://www.rootwills.co.uk" style="color: #BA8E4E; text-decoration: none;">www.rootwills.co.uk</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO_EMAIL,
      to: params.applicantEmail,
      subject: `🎉 Your Rootwills Wholesale Account is Approved (${params.assignedId})`,
      html: approvedHtml,
    });
    return { success: true, messageId: res.data?.id };
  } catch (err: any) {
    console.error('[Resend Approved Email Error]', err);
    return { success: false, error: err.message };
  }
}
