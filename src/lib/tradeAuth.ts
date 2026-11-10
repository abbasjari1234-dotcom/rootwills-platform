/**
 * Rootwills Wholesale B2B Trade Authentication Store & Verification
 * Commercial trade accounts for rootwillsdirect.co.uk
 */

export interface TradeAccount {
  id: string; // e.g. RW-2026-89412
  company: string;
  contactName: string;
  email: string;
  tier: string;
  postcode: string;
  passwordHash?: string;
  plainPassword?: string;
}

// Master executive passwords
const MASTER_PASSWORDS = [
  process.env.ROOTWILLS_TRADE_PASSWORD,
  'RootwillsTrade2026!',
  'RootwillsDirect2026!',
  'Rootwills2026!',
].filter(Boolean) as string[];

// Verified Commercial Hospitality Trade Registry
export const VERIFIED_TRADE_ACCOUNTS: TradeAccount[] = [
  // Rootwills Central Operations & Sales Desk
  {
    id: 'RW-MASTER',
    company: 'Rootwills Central Logistics',
    contactName: 'Operations Lead',
    email: 'sales@rootwills.co.uk',
    tier: 'Master Wholesale Administration',
    postcode: 'B5 4RB',
    plainPassword: 'RootwillsTrade2026!',
  },
  {
    id: 'RW-ADMIN',
    company: 'Rootwills Direct Commercial Desk',
    contactName: 'Trade Desk Dispatch',
    email: 'admin@rootwills.co.uk',
    tier: 'Executive Trade Desk',
    postcode: 'B5 4RB',
    plainPassword: 'RootwillsTrade2026!',
  },
  // Sample Approved Hospitality Clients
  {
    id: 'RW-89412',
    company: 'Dishoom Shoreditch & Birmingham',
    contactName: 'Navin Kumar',
    email: 'orders@dishoom.com',
    tier: 'Tier 1 Hospitality Direct',
    postcode: 'E2 7JE',
    plainPassword: 'Dishoom2026!',
  },
  {
    id: 'RW-94810',
    company: 'The Savoy London (Fairmont)',
    contactName: 'Thierry M.',
    email: 'purchasing@savoy.london',
    tier: 'Pre-Dawn Tier 1 Luxury',
    postcode: 'WC2R 0EZ',
    plainPassword: 'Savoy2026!',
  },
  {
    id: 'RW-94809',
    company: 'The Ivy Birmingham',
    contactName: 'Marcus Hall',
    email: 'birmingham@theivy-collection.com',
    tier: 'Tier 1 Midlands Hospitality',
    postcode: 'B2 5LS',
    plainPassword: 'TheIvy2026!',
  },
  {
    id: 'RW-DEMO',
    company: 'B2B Wholesale Demo Account',
    contactName: 'Executive Trade Guest',
    email: 'demo@rootwills.co.uk',
    tier: 'Trade Demonstration Tier',
    postcode: 'B1 1AA',
    plainPassword: 'RootwillsTrade2026!',
  },
];

// Runtime store for newly approved customer accounts from Ops CRM
let dynamicTradeAccounts: TradeAccount[] = [];

export function registerApprovedTradeAccount(account: TradeAccount): TradeAccount {
  const cleanId = account.id.trim();
  const cleanEmail = account.email.trim().toLowerCase();

  const idx = dynamicTradeAccounts.findIndex(
    (a) => a.id.toLowerCase() === cleanId.toLowerCase() || a.email.toLowerCase() === cleanEmail
  );

  if (idx !== -1) {
    dynamicTradeAccounts[idx] = { ...dynamicTradeAccounts[idx], ...account };
    return dynamicTradeAccounts[idx];
  } else {
    dynamicTradeAccounts.unshift(account);
    return account;
  }
}

export function getAllTradeAccounts(): TradeAccount[] {
  return [...dynamicTradeAccounts, ...VERIFIED_TRADE_ACCOUNTS];
}

/**
 * Verifies credentials for commercial login on rootwillsdirect.co.uk
 */
export function verifyTradeCredentials(
  identifier: string,
  rawPassword: string
): { success: boolean; account?: TradeAccount; message?: string } {
  if (!identifier || !rawPassword) {
    return { success: false, message: 'Please provide both Account ID/Email and Password.' };
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = rawPassword.trim();

  // 1. Check if matching any of the master accounts with any master password
  const isMasterUser =
    cleanId === 'sales@rootwills.co.uk' ||
    cleanId === 'admin@rootwills.co.uk' ||
    cleanId === 'rootwills' ||
    cleanId === 'rw-master' ||
    cleanId === 'rw-direct';

  if (isMasterUser) {
    if (MASTER_PASSWORDS.includes(cleanPass)) {
      return {
        success: true,
        account: VERIFIED_TRADE_ACCOUNTS[0],
      };
    }
  }

  // 2. Check in dynamic approved trade accounts
  const dynamicMatch = dynamicTradeAccounts.find(
    (acc) =>
      acc.id.toLowerCase() === cleanId ||
      acc.email.toLowerCase() === cleanId
  );

  if (dynamicMatch) {
    if (dynamicMatch.plainPassword === cleanPass || MASTER_PASSWORDS.includes(cleanPass)) {
      const { plainPassword, passwordHash, ...safeAccount } = dynamicMatch;
      return {
        success: true,
        account: safeAccount as TradeAccount,
      };
    }
  }

  // 3. Check in static verified trade accounts registry
  const match = VERIFIED_TRADE_ACCOUNTS.find(
    (acc) =>
      acc.id.toLowerCase() === cleanId ||
      acc.email.toLowerCase() === cleanId
  );

  if (match) {
    // Check specific password or master override
    if (match.plainPassword === cleanPass || MASTER_PASSWORDS.includes(cleanPass)) {
      const { plainPassword, passwordHash, ...safeAccount } = match;
      return {
        success: true,
        account: safeAccount as TradeAccount,
      };
    }
  }

  // 4. Reject any random/unknown credentials
  return {
    success: false,
    message:
      'Invalid Account ID or Password. Only verified commercial accounts can sign in. Please verify your credentials or apply for a trade account.',
  };
}

