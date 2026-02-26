import PatternGallery from '@/components/patterns/PatternGallery';
import PatternSourceTabs from '@/components/patterns/PatternSourceTabs';
import { samplePatterns } from '@/data/samplePatterns';
import { useListPatterns } from '@/hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function PatternGalleryPage() {
  const { data: cloudPatterns, isLoading } = useListPatterns();

  const cloudPatternsFormatted = cloudPatterns?.map((p) => ({
    id: p.name,
    name: p.name,
    thumbnail: p.thumbnail || '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 300,
  })) || [];

  return (
    <div className="container max-w-6xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Pattern Gallery</h1>
        <p className="text-muted-foreground">
          Browse and select patterns for your sand table
        </p>
      </div>

      <PatternSourceTabs
        localContent={<PatternGallery patterns={samplePatterns} />}
        cloudContent={
          isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <PatternGallery patterns={cloudPatternsFormatted} />
          )
        }
      />
    </div>
  );
}
