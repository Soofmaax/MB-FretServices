import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResponsiveImage from '../ResponsiveImage';

describe('ResponsiveImage', () => {
  const src =
    'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600';

  it('renders img with correct attributes and srcset', () => {
    render(
      <ResponsiveImage
        src={src}
        alt="hero"
        width={1600}
        height={900}
        sizes="100vw"
        className="object-cover"
      />
    );

    const img = screen.getByAltText('hero') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.width).toBe(1600);
    expect(img.height).toBe(900);
    expect(img.getAttribute('sizes')).toBe('100vw');
    // Should be lazy by default
    expect(img.getAttribute('loading')).toBe('lazy');

    // Source srcset should have 3 widths
    const source = img.previousElementSibling as HTMLSourceElement;
    expect(source).toBeTruthy();
    const srcset = source?.getAttribute('srcset') ?? '';
    expect(srcset).toContain('w=800 800w');
    expect(srcset).toContain('w=1200 1200w');
    expect(srcset).toContain('w=1600 1600w');
  });

  it('uses priority when requested', () => {
    render(
      <ResponsiveImage
        src={src}
        alt="priority"
        width={1600}
        height={900}
        sizes="100vw"
        priority
      />
    );

    const img = screen.getByAltText('priority') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('fetchpriority') || img.getAttribute('fetchPriority')).toBe('high');
  });
});