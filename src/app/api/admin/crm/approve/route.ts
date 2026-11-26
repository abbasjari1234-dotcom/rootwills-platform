import { NextRequest, NextResponse } from 'next/server';
import {
  registerApprovedTradeAccount,
  getAllTradeAccounts,
  updateTradeAccount,
  removeTradeAccount,
  TradeAccount,
} from '@/lib/tradeAuth';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/security/auth-guard';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { sendApprovedAccountEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  const supabase = getSupabaseAdmin();
  let liveLeads: any[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && Array.isArray(data)) {
        liveLeads = data.map((lead: any, idx: number) => {
          let parsedNotes: any = {};
          try {
            parsedNotes = typeof lead.notes === 'string' ? JSON.parse(lead.notes) : lead.notes || {};
          } catch {
            parsedNotes = {};
          }

          const isApproved = Boolean(parsedNotes.isApproved);

          return {
            id: lead.id,
            slNo: idx + 1,
            name: lead.company_name || 'Hospitality Venue',
            segment: parsedNotes.accountTier || 'Wholesale Direct Account',
            description: parsedNotes.message
              ? `${parsedNotes.message} (Postcode: ${lead.postcode})`
              : `Delivery Postcode: ${lead.postcode || 'B5 6EU'} • Weekly Spend: ${parsedNotes.approxWeeklySpend || '£1,000+'}`,
            headChef: lead.contact_name || 'Chef / Buyer',
            phone: lead.phone || '',
            email: lead.email || '',
            postcode: lead.postcode || 'UK',
            assignedReps: [{ name: 'Birmingham Desk', avatar: 'BD' }],
            dueDate: lead.created_at
              ? new Date(lead.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Today',
            priority: isApproved ? 'Normal' : 'Urgent',
            creditUtilized: isApproved ? 35 : 0,
            spendMonth: parsedNotes.approxWeeklySpend || (lead.estimated_spend ? `£${lead.estimated_spend}` : 'Quote Terms'),
            paymentTerms: '14 Days Net',
            isApproved,
            approvedId: parsedNotes.approvedId,
            approvedPassword: parsedNotes.approvedPassword,
            isWebLead: true,
          };
        });
      }
    } catch (err) {
      console.error('[Supabase GET Leads CRM Error]', err);
    }
  }

  // Also include runtime registered trade accounts
  const staticAccounts = getAllTradeAccounts().map(({ plainPassword, passwordHash, ...safe }) => safe);

  return NextResponse.json({
    success: true,
    leads: liveLeads,
    staticAccounts,
  });
}

export async function POST(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  try {
    const body = await req.json();
    const { id, company, contactName, email, phone, postcode, plainPassword, tier, leadId } = body || {};

    if (!company || !email) {
      return NextResponse.json(
        { error: 'Company and Email are required to approve trade account.' },
        { status: 400 }
      );
    }

    const assignedId = id || `RW-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const assignedPassword = plainPassword || `Rootwills${new Date().getFullYear()}!`;
    const cleanEmail = String(email).trim().toLowerCase();

    const newTradeAccount: TradeAccount = {
      id: assignedId,
      company: String(company).trim(),
      contactName: String(contactName || 'Head Chef / Buyer').trim(),
      email: cleanEmail,
      tier: String(tier || 'Tier 1 Wholesale Direct').trim(),
      postcode: String(postcode || 'UK').trim().toUpperCase(),
      plainPassword: assignedPassword,
    };

    // 1. Register in runtime memory store
    const registered = registerApprovedTradeAccount(newTradeAccount);

    // 2. Persist approved status and credentials to Supabase `leads` table
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        let targetLead: any = null;

        if (leadId) {
          const { data } = await supabase.from('leads').select('*').eq('id', leadId).single();
          targetLead = data;
        } else {
          const { data } = await supabase.from('leads').select('*').eq('email', cleanEmail).order('created_at', { ascending: false }).limit(1);
          if (data && data.length > 0) targetLead = data[0];
        }

        if (targetLead) {
          let existingNotes: any = {};
          try {
            existingNotes = typeof targetLead.notes === 'string' ? JSON.parse(targetLead.notes) : targetLead.notes || {};
          } catch {
            existingNotes = {};
          }

          const updatedNotes = {
            ...existingNotes,
            isApproved: true,
            approvedId: assignedId,
            approvedPassword: assignedPassword,
            approvedAt: new Date().toISOString(),
          };

          await supabase
            .from('leads')
            .update({
              status: 'contacted',
              notes: JSON.stringify(updatedNotes),
              updated_at: new Date().toISOString(),
            })
            .eq('id', targetLead.id);
        } else {
          // If lead wasn't present, insert an approved lead record
          await supabase.from('leads').insert({
            company_name: newTradeAccount.company,
            contact_name: newTradeAccount.contactName,
            email: cleanEmail,
            phone: phone || '+447984709478',
            postcode: newTradeAccount.postcode,
            sector: 'fine_dining',
            source: 'ops_crm',
            status: 'contacted',
            notes: JSON.stringify({
              isApproved: true,
              approvedId: assignedId,
              approvedPassword: assignedPassword,
              approvedAt: new Date().toISOString(),
            }),
          });
        }
      } catch (dbErr) {
        console.error('[Supabase CRM Approval Update Warning]', dbErr);
      }
    }

    // 3. Build welcome message templates & links
    const portalUrl = 'https://www.rootwills.co.uk/direct';
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    const welcomeText = `Hello ${newTradeAccount.contactName},\n\nYour commercial wholesale trade account for ${newTradeAccount.company} has been approved.\n\nDirect Ordering Portal: ${portalUrl}\nAccount ID: ${newTradeAccount.id}\nTemporary Password: ${assignedPassword}\n\nYou can now sign in to view your bespoke contract pricing and place pre-dawn kitchen orders.\n\nRootwills Birmingham Logistics Hub`;

    const whatsappUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(welcomeText)}`
      : `https://wa.me/?text=${encodeURIComponent(welcomeText)}`;

    const mailtoSubject = encodeURIComponent(`Rootwills Wholesale Account Approved — ${newTradeAccount.company}`);
    const mailtoBody = encodeURIComponent(welcomeText);
    const mailtoUrl = `mailto:${cleanEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // 4. Send email via Resend if configured
    sendApprovedAccountEmail({
      applicantName: newTradeAccount.contactName,
      applicantEmail: cleanEmail,
      company: newTradeAccount.company,
      assignedId,
      plainPassword: assignedPassword,
      portalUrl,
    }).catch((err) => console.error('[Email Send Approved Warning]', err));

    return NextResponse.json({
      success: true,
      account: registered,
      credentials: {
        id: registered.id,
        password: assignedPassword,
        portalUrl,
        whatsappUrl,
        mailtoUrl,
        welcomeText,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to approve customer account' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  try {
    const body = await req.json();
    const { id, name, company, headChef, contactName, email, phone, postcode, segment, tier, spendMonth, paymentTerms, priority, plainPassword, password } = body || {};

    if (!id && !email) {
      return NextResponse.json({ error: 'Account ID or Email is required for update.' }, { status: 400 });
    }

    const targetId = id || email;
    const resolvedCompany = company || name;
    const resolvedContact = contactName || headChef;
    const resolvedPass = plainPassword || password;

    const tradeUpdates: Partial<TradeAccount> = {};
    if (resolvedCompany) tradeUpdates.company = resolvedCompany;
    if (resolvedContact) tradeUpdates.contactName = resolvedContact;
    if (email) tradeUpdates.email = String(email).trim().toLowerCase();
    if (tier || segment) tradeUpdates.tier = tier || segment;
    if (postcode) tradeUpdates.postcode = String(postcode).trim().toUpperCase();
    if (resolvedPass) tradeUpdates.plainPassword = resolvedPass;

    updateTradeAccount(targetId, tradeUpdates);

    // Persist to Supabase if available
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        const updateData: any = {};
        if (resolvedCompany) updateData.company_name = resolvedCompany;
        if (resolvedContact) updateData.contact_name = resolvedContact;
        if (email) updateData.email = String(email).trim().toLowerCase();
        if (phone) updateData.phone = phone;
        if (postcode) updateData.postcode = postcode;

        await supabase.from('leads').update(updateData).or(`id.eq.${id},email.eq.${email}`);
      } catch (err) {
        console.error('[Supabase CRM PATCH error]', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Account updated successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { searchParams } = new URL(req.url);
    const id = body.id || searchParams.get('id');
    const email = body.email || searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json({ error: 'Account ID or Email is required for deletion.' }, { status: 400 });
    }

    const target = id || email;
    removeTradeAccount(target);

    // Delete or archive in Supabase if available
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        if (id) {
          await supabase.from('leads').delete().eq('id', id);
        } else if (email) {
          await supabase.from('leads').delete().eq('email', email);
        }
      } catch (err) {
        console.error('[Supabase CRM DELETE error]', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Account deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete account' }, { status: 500 });
  }
}
