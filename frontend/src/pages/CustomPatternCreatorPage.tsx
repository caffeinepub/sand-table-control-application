import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SketchCanvas from '@/components/creator/SketchCanvas';
import ImageUploadVectorizer from '@/components/creator/ImageUploadVectorizer';
import PromptPatternGenerator from '@/components/creator/PromptPatternGenerator';
import SpeedScaleControls from '@/components/creator/SpeedScaleControls';
import GCodePreviewPanel from '@/components/creator/GCodePreviewPanel';
import PatternPreview from '@/components/preview/PatternPreview';
import { generateGCode } from '@/gcode/gcodeGenerator';
import { Pencil, Image, Sparkles } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export default function CustomPatternCreatorPage() {
  const [path, setPath] = useState<Point[]>([]);
  const [speed, setSpeed] = useState(100);
  const [scale, setScale] = useState(100);

  const gCode = path.length > 0 ? generateGCode(path, speed, scale) : '';

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Custom Pattern</h1>
        <p className="text-muted-foreground">
          Design your own sand table patterns using sketch, image, or text prompts
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Tabs defaultValue="sketch">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sketch" className="gap-2">
                <Pencil className="h-4 w-4" />
                Sketch
              </TabsTrigger>
              <TabsTrigger value="image" className="gap-2">
                <Image className="h-4 w-4" />
                Image
              </TabsTrigger>
              <TabsTrigger value="prompt" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Prompt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sketch" className="mt-4">
              <SketchCanvas onPathChange={setPath} />
            </TabsContent>
            <TabsContent value="image" className="mt-4">
              <ImageUploadVectorizer onPathChange={setPath} />
            </TabsContent>
            <TabsContent value="prompt" className="mt-4">
              <PromptPatternGenerator onPathChange={setPath} />
            </TabsContent>
          </Tabs>

          <SpeedScaleControls
            speed={speed}
            scale={scale}
            onSpeedChange={setSpeed}
            onScaleChange={setScale}
          />
        </div>

        <div className="space-y-6">
          <PatternPreview path={path} />
          <GCodePreviewPanel gCode={gCode} />
        </div>
      </div>
    </div>
  );
}
