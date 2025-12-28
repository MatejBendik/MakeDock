'use client';

import React, { useState, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, Image, FileCode, Copy, Check, Expand } from 'lucide-react';
import { domToPng, domToSvg } from 'modern-screenshot';

interface ExportMenuProps {
  dockRef: React.RefObject<HTMLDivElement | null>;
}

type ExportSize = '2x' | '4x' | '6x';

const sizeMultipliers: Record<ExportSize, number> = {
  '2x': 2,
  '4x': 4,
  '6x': 6,
};

// Custom fetch function to handle CORS by converting images to base64
async function fetchImageAsDataUrl(url: string): Promise<string | false> {
  // Skip if already a data URL
  if (url.startsWith('data:')) {
    return false; // Let library handle it normally
  }
  
  try {
    // Use a CORS proxy for external images
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Failed to fetch image via proxy:', url, error);
    return false;
  }
}

export function ExportMenu({ dockRef }: ExportMenuProps) {
  const [selectedSize, setSelectedSize] = useState<ExportSize>('2x');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const getExportOptions = useCallback(() => ({
    scale: sizeMultipliers[selectedSize],
    fetchFn: fetchImageAsDataUrl,
    timeout: 60000,
    debug: true,
  }), [selectedSize]);

  const handleExportPng = useCallback(async () => {
    if (!dockRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = await domToPng(dockRef.current, getExportOptions());
      
      const link = document.createElement('a');
      link.download = `makedock-${selectedSize}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export PNG:', error);
      alert('Failed to export. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [dockRef, selectedSize, getExportOptions]);

  const handleExportSvg = useCallback(async () => {
    if (!dockRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = await domToSvg(dockRef.current, getExportOptions());
      
      const link = document.createElement('a');
      link.download = `makedock-${selectedSize}.svg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export SVG:', error);
      alert('Failed to export. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [dockRef, selectedSize, getExportOptions]);

  const handleCopyImage = useCallback(async () => {
    if (!dockRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = await domToPng(dockRef.current, getExportOptions());
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy image:', error);
      alert('Failed to copy image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [dockRef, selectedSize, getExportOptions]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2 bg-red-500 hover:bg-red-600 text-white"
          disabled={isExporting}
        >
          <Download className="h-4 w-4" />
          Export Image
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleExportPng} className="gap-2 cursor-pointer">
          <Image className="h-4 w-4" />
          Save PNG
          <span className="ml-auto text-xs text-muted-foreground">⌘ S</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportSvg} className="gap-2 cursor-pointer">
          <FileCode className="h-4 w-4" />
          Save SVG
          <span className="ml-auto text-xs text-muted-foreground">⌘ ⇧ S</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyImage} className="gap-2 cursor-pointer">
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          Copy Image
          <span className="ml-auto text-xs text-muted-foreground">⌘ C</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Expand className="h-4 w-4" />
            Size
            <span className="ml-auto">{selectedSize}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {(['2x', '4x', '6x'] as ExportSize[]).map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => setSelectedSize(size)}
                className="cursor-pointer"
              >
                {selectedSize === size && (
                  <span className="mr-2">•</span>
                )}
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
