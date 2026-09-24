import { products } from '../data/products';
import { blogPosts } from '../data/blog';
import { portfolioProjects } from '../data/portfolio';
import { servicePackages } from '../data/services';
import { teamMembers } from '../data/team';
import { defaultCustomizerSettings } from '../context/LiveCustomizerContext';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

(global as any).WebSocket = WebSocket;

const url = 'https://jrvmfcikqptxjxiaytej.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impydm1mY2lrcXB0eGp4aWF5dGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjQxNjEsImV4cCI6MjEwNTg0MDE2MX0.Ue4wIDy1V_0sGKFYiWakTdC2vT4_nibdYKzaRaIgMfw';

const supabase = createClient(url, key);

async function main() {
  console.log('Seeding initial datasets to Supabase novio_site_data...');
  const rows = [
    { key: 'products', data: products, updated_at: new Date().toISOString() },
    { key: 'blog', data: blogPosts, updated_at: new Date().toISOString() },
    { key: 'portfolio', data: portfolioProjects, updated_at: new Date().toISOString() },
    { key: 'services', data: servicePackages, updated_at: new Date().toISOString() },
    { key: 'team', data: teamMembers, updated_at: new Date().toISOString() },
    { key: 'customizer', data: defaultCustomizerSettings, updated_at: new Date().toISOString() },
  ];

  const { data, error } = await supabase.from('novio_site_data').upsert(rows, { onConflict: 'key' }).select('key');
  if (error) {
    console.error('Seed error:', error);
    process.exit(1);
  } else {
    console.log('Successfully seeded rows:', data);
  }
}

main();
