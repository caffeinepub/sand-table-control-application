import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface Point {
  x: number;
  y: number;
}

interface ImageUploadVectorizerProps {
  onPathChange: (path: Point[]) => void;
}

export default function ImageUploadVectorizer({ onPathChange }: ImageUploadVectorizerProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreview(dataUrl);
      
      // Simple edge detection simulation
      const simplePath: Point[] = [];
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        simplePath.push({
          x: 300 + Math.cos(angle) * 100,
          y: 200 + Math.sin(angle) * 100,
        });
      }
      onPathChange(simplePath);
      toast.success('Image processed');
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 rounded" />
          ) : (
            <Upload className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <Button asChild className="w-full">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            Upload Image
          </label>
        </Button>
      </CardContent>
    </Card>
  );
}
