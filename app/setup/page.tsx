import { Metadata } from 'next';
import SetupWizardClient from './SetupWizardClient';

export const metadata: Metadata = {
  title: 'Setup Wizard — NOVIO',
  description: 'Konfigurasi awal NOVIO Web: koneksi database, environment, dan validasi layanan.',
  robots: { index: false, follow: false },
};

export default function SetupPage() {
  return <SetupWizardClient />;
}
