import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('id-ID', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (featured) {
    return (
      <article className="group bg-softwhite rounded-xl overflow-hidden border border-sage/40 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 mb-12">
        {/* Large Featured Image */}
        <Link
          href={`/blog/${post.slug}`}
          className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto w-full overflow-hidden bg-cream block"
          aria-label={`Baca artikel: ${post.title}`}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-forest text-softwhite rounded shadow-sm">
            Artikel Pilihan
          </span>
        </Link>

        {/* Content */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-xs text-charcoal-muted uppercase tracking-wider mb-4 font-medium">
              <span className="text-garden font-semibold">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              {post.readTimeMinutes && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTimeMinutes} mnt baca
                  </span>
                </>
              )}
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-charcoal group-hover:text-garden transition-colors leading-tight mb-4">
                {post.title}
              </h3>
            </Link>

            <p className="text-charcoal/70 text-base leading-relaxed mb-6">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-cream-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-sage/30">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal">{post.author.name}</p>
                <p className="text-[11px] text-charcoal-muted">{post.author.role}</p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-garden hover:text-forest transition-colors"
            >
              <span>Baca Artikel</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-softwhite rounded-lg overflow-hidden border border-sage/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-cream block"
        aria-label={`Baca artikel: ${post.title}`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-3 left-3 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-forest/80 backdrop-blur-sm text-softwhite rounded">
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-charcoal-muted mb-3 font-medium">
            <Calendar className="w-3.5 h-3.5 text-sage" />
            <span>{formattedDate}</span>
            {post.readTimeMinutes && (
              <>
                <span>•</span>
                <span>{post.readTimeMinutes} mnt baca</span>
              </>
            )}
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-serif text-xl font-medium text-charcoal group-hover:text-garden transition-colors leading-snug mb-3 line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-2 mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Action */}
        <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
          <span className="text-xs text-charcoal-muted">{post.author.name}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-garden group-hover:text-forest transition-colors"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
