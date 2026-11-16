import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Ilustrasi Pembelajaran',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-slate-200 text-slate-600 p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
          <ImageIcon className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-slate-700">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
