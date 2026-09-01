import React from 'react';
import type { Metadata } from 'next';
import { AdminNotificationsView } from '@/components/admin/AdminNotificationsView';

export const metadata: Metadata = {
  title: 'Automated Kitchen SMS & WhatsApp Alerts | Rootwills',
  description:
    'Configure automated 10:30 PM kitchen cut-off reminders, morning cold-chain dispatch SMS, and WhatsApp alerts for trade chefs. Open communications desk.',
};

export default function NotificationsPage() {
  return <AdminNotificationsView />;
}
