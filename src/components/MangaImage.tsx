import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface MangaImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  darkFallback?: boolean;
}

export function MangaImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  darkFallback = false,
}: MangaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center p-6 text-center ${
          darkFallback
            ? 'bg-[#1A1A1A] text-[#FAF8F5] screentone-dark'
            : 'bg-[#F3EFE8] text-[#111111] screentone-corner'
        } ${className}`}
      >
        <ImageIcon className="w-8 h-8 mb-3 opacity-60" aria-hidden="true" />
        <span className="font-mono-tech text-xs uppercase tracking-wider font-semibold">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="sync"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
