import type { FC } from 'react';

type ResponsiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  type?: 'image/jpeg' | 'image/png' | 'image/webp';
};

function replaceWidth(url: string, w: number): string {
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
 * - Generates srcset from the provided URL using the "w=" param convention.
 * - Preserves explicit width/height to avoid CLS.
 * - Supports priority loading for LCP images.
 */
const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  priority = false,
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