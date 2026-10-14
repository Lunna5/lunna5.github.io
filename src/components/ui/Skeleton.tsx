import React from 'react';

export interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton = ({ className = '', width, height }: SkeletonProps) => {
  return (
    <div
      className={`skeleton-shimmer rounded-sm ${className}`}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className='border-retro border-ink shadow-retro flex h-72 flex-col justify-between rounded-sm bg-white p-6'>
      <div>
        <div className='border-ink/10 mb-4 flex items-center justify-between border-b pb-3'>
          <div className='flex items-center gap-2.5'>
            <Skeleton className='h-5 w-5 rounded-full' />
            <Skeleton className='h-4 w-32' />
          </div>
          <Skeleton className='h-4 w-12' />
        </div>

        <div className='mb-6 space-y-2'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-4/5' />
          <Skeleton className='h-3 w-3/5' />
        </div>
      </div>

      <div>
        <div className='mb-4 flex gap-2'>
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-14' />
        </div>
        <div className='border-ink/10 flex items-center justify-between border-t pt-3'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-7 w-24' />
        </div>
      </div>
    </div>
  );
};
