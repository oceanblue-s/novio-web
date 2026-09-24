import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mode Edit Visual Website | NOVIO',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomizePage() {
  redirect('/?edit=true');
}
