import type { FC } from 'react';

type ResponsiveImageProps = {
  src: string; // fallback image (e.g., JPEG)
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Optional modern formats if available (self-hosted). */
  webpSrc?: string;
  avifSrc?: string;
  /** Fallback type for the &lt;img&gt; element. */
  type?: 'image/jpeg' | 'image/png' | 'image/webp';
};

function isLocal(url: string): boolean {
  return !/^https?:\/\//i.test(url);
}

function buildFileVariant(url: string, w: number): string {
  const idx = url.lastIndexOf('.');
  if (idx === -1) return url;
  const base = url.slice(0, idx);
  const ext = url.slice(idx);
  return `${base}-${w}${ext}`;
}

function replaceWidth(url: string, w: number): string {
  if (isLocal(url)) {
    // For local assets, follow naming convention: image-800.ext
    return buildFileVariant(url, w);
  }
  if (url.includes('w=')) {
    return url.replace(/w=\d+/, `w=${w}`);
  }
  // Append width param if missing
  const hasQuery = url.includes('?');
  return `${url}${hasQuery ? '&' : '?'}w=${w}`;
}

function buildSrcSet(url: string): string {
  const variants = [800, 1200, 1600];
  return variants.map((w) => `${replaceWidth(url, w)} ${w}w`).join(', ');
}

/**
 * Stable, reusable responsive image component.
 * - Generates srcset from the provided URL using the "w=" param convention for remote (e.g., Pexels),
 *   and the "-{w}" filename convention for local assets.
 * - Preserves explicit width/height to avoid CLS.
 * - Supports priority loading for LCP images.
 * - Supports optional AVIF/WebP sources (if provided), otherwise falls back to src.
 */
const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  priority = false,
  webpSrc,
  avifSrc,
  type = 'image/jpeg',
}) => {
  const imgProps: Record<string, string> = {};
  if (priority) {
    imgProps.loading = 'eager';
    imgProps.fetchPriority = 'high';
  } else {
    imgProps.loading = 'lazy';
  }

  return (
    <picture>
      {avifSrc ? <source type="image/avif" srcSet={buildSrcSet(avifSrc)} /> : null}
      {webpSrc ? <source type="image/webp" srcSet={buildSrcSet(webpSrc)} /> : null}
      <source type={type} srcSet={buildSrcSet(src)} />
      <img
        src={src}
        alt={alt}
        decoding="async"
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        {...imgProps}
      />
    </picture>
  );
};

export default ResponsiveImage;