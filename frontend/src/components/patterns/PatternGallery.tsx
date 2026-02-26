import { useState, useMemo } from 'react';
import PatternTile from './PatternTile';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface Pattern {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
}

interface PatternGalleryProps {
  patterns: Pattern[];
}

export default function PatternGallery({ patterns }: PatternGalleryProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'duration'>('name');

  const filteredAndSorted = useMemo(() => {
    let result = patterns.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.duration - b.duration;
    });

    return result;
  }, [patterns, search, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patterns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'duration')}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="duration">Sort by Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <img
            src="/assets/generated/empty-patterns.dim_1200x800.png"
            alt="No patterns"
            className="mb-4 h-48 w-auto opacity-50"
          />
          <p className="text-muted-foreground">No patterns found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((pattern) => (
            <PatternTile key={pattern.id} {...pattern} />
          ))}
        </div>
      )}
    </div>
  );
}
