import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface PatternTileProps {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
}

export default function PatternTile({ id, name, thumbnail, duration }: PatternTileProps) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Link to="/pattern/$patternId" params={{ patternId: id }}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold leading-tight">{name}</h3>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {durationText}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
