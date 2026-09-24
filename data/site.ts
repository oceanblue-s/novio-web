import { Office, NavItem } from '@/types';

export const siteConfig = {
  name: 'NOVIO',
  tagline: 'Komponen Kuliner Alami × Hasil Tani Artisan Indonesia',
  description:
    'Menghadirkan bahan kuliner alami bermutu tinggi dari kebun petani lokal untuk para chef profesional dan penikmat kuliner di seluruh Indonesia.',
  generalEmail: 'novio.customercare@gmail.com',
  generalPhone: '081312414863',
  whatsappTarget: '6281312414863', // Normalized for wa.me/6281312414863
  mainAddress: 'Ciwarega, Karyawangi, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559',
  url: 'https://novio-web.vercel.app',
};

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Layanan', href: '/services' },
  { label: 'Produk', href: '/product' },
  { label: 'Portofolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/contact' },
];

export const offices: Office[] = [
  {
    id: 'bandung',
    name: 'Kantor Pusat Bandung',
    email: 'novio.customercare@gmail.com',
    phone: '0813 1241 4863',
    address: 'Ciwarega, Karyawangi, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15845.894396024823!2d107.5750!3d-6.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e146746cfdfb%3A0x286395fb6f1c42f3!2sKaryawangi%2C%20Parongpong%2C%20West%20Bandung%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    googleMapsLink:
      'https://maps.google.com/?q=Ciwarega,+Karyawangi,+Parongpong,+Bandung+Barat',
    isHeadquarter: true,
  },
  {
    id: 'bali',
    name: 'Kantor Cabang Bali',
    email: 'nunik@noviotrade.com',
    phone: '0811 2906 792',
    address: 'Jl Kedaung G 5 menesa nusa dua, Badung, Bali, Indonesia 80363',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.864396024823!2d115.2150!3d-8.7950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd244c000000001%3A0x0!2sNusa%20Dua%2C%20Badung%2C%20Bali!5e0!3m2!1sen!2sid!4v1700000000001!5m2!1sen!2sid',
    googleMapsLink:
      'https://maps.google.com/?q=Jl+Kedaung+G+5+menesa+nusa+dua,+Badung,+Bali+80363',
    isHeadquarter: false,
  },
];
