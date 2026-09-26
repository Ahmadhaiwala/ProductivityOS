import { FolderOpen } from 'lucide-react';
import type { Bucket } from '../../types';

interface BucketFilterProps {
  buckets: Bucket[];
  activeBucketId?: string;
}

export function BucketFilter({ buckets, activeBucketId = 'all' }: BucketFilterProps) {
  return (
    <div className="bucket-list" role="list" aria-label="Filter by bucket">
      {buckets.map((bucket) => (
        <div 
          key={bucket.id} 
          className={`bucket-chip${bucket.id === activeBucketId ? ' active' : ''}`} 
          role="listitem"
        >
          <FolderOpen size={13} />
          {bucket.name}
          <span className="badge badge-primary" aria-label={`${bucket.count} tasks`}>
            {bucket.count}
          </span>
        </div>
      ))}
    </div>
  );
}
