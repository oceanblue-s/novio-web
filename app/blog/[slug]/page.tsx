import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import { products } from '@/data/products';
import { siteConfig } from '@/data/site';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ArrowRight, Sparkles } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BLOG_PRODUCT_MAP: Record<string, string> = {
  'racikan-tisane-terbaru-novio-segar-alami': 'novio-tisane-blends',
  'cuka-fermentasi-artisan-cita-rasa-gourmet': 'cuka-fermentasi-alami',
  'microgreens-dan-bunga-konsumsi-estetika-kuliner': 'microgreens-organik-premium',
  'kombucha-minuman-fermentasi-dan-pairing-kuliner': 'kombucha-sparkling-tea',
  'kombucha-syrup-kreasi-minuman-dan-kuliner-artisan': 'kombucha-syrup',
};

function formatInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-charcoal">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-charcoal/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Article Not Found | NOVIO',
    };
  }

  return {
    title: `${post.seo.title || post.title} | Jurnal NOVIO`,
    description: post.seo.description || post.excerpt,
    keywords: post.seo.keywords,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
      type: 'article',
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedProductSlug = BLOG_PRODUCT_MAP[post.slug];
  const relatedProduct = relatedProductSlug
    ? products.find((p) => p.slug === relatedProductSlug)
    : null;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('id-ID', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT. Novio Berkah Bersaudara',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/novio-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <article className="pt-28 pb-24 bg-softwhite">
      {/* Schema.org BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted hover:text-garden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Artikel</span>
          </Link>
        </div>

        {/* Header Content */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-garden mb-4">
            <span className="bg-cream px-3 py-1 rounded-full border border-sage/40">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-charcoal-muted">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            {post.readTimeMinutes && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-charcoal-muted">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTimeMinutes} mnt baca
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed font-light mb-8">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center justify-between py-4 border-y border-sage/30">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-cream border border-sage/40">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{post.author.name}</p>
                <p className="text-xs text-charcoal-muted">{post.author.role}</p>
              </div>
            </div>

            <div className="text-xs text-charcoal-muted uppercase tracking-wider">
              Editorial <span translate="no" className="notranslate font-semibold">NOVIO</span>
            </div>
          </div>
        </header>

        {/* Lead Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-12 shadow-sm border border-sage/40">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-stone max-w-none text-charcoal/85 text-base sm:text-lg leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-10 mb-4 pt-4 border-t border-sage/20"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={index} className="space-y-2.5 my-4 pl-4 list-disc marker:text-garden">
                  {items.map((item, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      {formatInlineText(item.replace('- ', ''))}
                    </li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(paragraph)) {
              const items = paragraph.split('\n');
              return (
                <ol key={index} className="space-y-3 my-4 pl-5 list-decimal marker:font-bold marker:text-garden">
                  {items.map((item, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      {formatInlineText(item.replace(/^\d+\.\s*/, ''))}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index} className="leading-relaxed">
                {formatInlineText(paragraph)}
              </p>
            );
          })}
        </div>

        {/* Mentioned Product Highlight Box */}
        {relatedProduct && (
          <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cream via-softwhite to-cream border border-sage/40 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-full sm:w-44 aspect-square rounded-xl overflow-hidden shrink-0 border border-sage/30 bg-cream">
              <Image
                src={relatedProduct.coverImage}
                alt={relatedProduct.name}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-forest text-softwhite rounded shadow-xs">
                {relatedProduct.category}
              </span>
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-garden">
                Produk Kurasi Terkait Artikel Ini
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                {relatedProduct.name}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal/70 line-clamp-2 leading-relaxed">
                {relatedProduct.shortDescription}
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                <Link
                  href={`/product/${relatedProduct.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest hover:bg-forest-light text-softwhite text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  <span>Lihat Detail Produk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
                    `Halo NOVIO, saya membaca artikel "${post.title}" dan tertarik dengan produk "${relatedProduct.name}". Mohon informasi pemesanannya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden/15 hover:bg-garden/25 text-forest border border-garden/40 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Tanya via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Article Tags */}
        <div className="mt-12 pt-8 border-t border-sage/30 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Topik:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-cream text-charcoal-muted border border-sage/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="mt-12 p-8 rounded-xl bg-cream border border-sage/40 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-sage/40">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-garden">
              Ditulis oleh
            </span>
            <h4 className="font-serif text-xl font-medium text-charcoal mb-1">
              {post.author.name}
            </h4>
            <p className="text-xs text-charcoal-muted mb-2">{post.author.role}</p>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Kurator botani dan peneliti hortikultura di <span translate="no" className="notranslate font-semibold">NOVIO</span>, berfokus pada propagasi dataran tinggi berkelanjutan, kesehatan mikroba tanah, serta integrasi biofilik arsitektural.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-sage/30">
            <h3 className="font-serif text-2xl font-medium text-charcoal mb-8">
              Lanjutkan Membaca
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-cream/40 rounded-xl p-6 border border-sage/30 hover:border-garden transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-garden uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <Link href={`/blog/${rel.slug}`}>
                      <h4 className="font-serif text-xl font-medium text-charcoal group-hover:text-garden transition-colors mt-2 mb-3">
                        {rel.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-garden group-hover:text-forest"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
