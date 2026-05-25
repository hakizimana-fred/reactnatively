import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  size?: number;
}

export function BrandMark({ className, size = 32 }: BrandMarkProps) {
  return (
    <Image
      src="/reactnatively-mark.svg"
      alt=""
      width={size}
      height={size}
      className={cn('rounded-xl shadow-[0_10px_28px_rgba(31,139,202,0.22)]', className)}
      priority
      aria-hidden
    />
  );
}
