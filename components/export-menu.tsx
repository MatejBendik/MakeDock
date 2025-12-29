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
import { type Theme } from '@/lib/themes';
import { toast } from 'sonner';

interface ExportMenuProps {
  dockRef: React.RefObject<HTMLDivElement | null>;
  theme: Theme;
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

export function ExportMenu({ dockRef, theme }: ExportMenuProps) {
  const [selectedSize, setSelectedSize] = useState<ExportSize>('2x');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const getExportOptions = useCallback(() => ({
    scale: sizeMultipliers[selectedSize],
    fetchFn: fetchImageAsDataUrl,
    timeout: 60000,
    backgroundColor: null,
    style: {
      // Use the selected theme's gradient
      background: theme.gradient,
    },
  }), [selectedSize, theme]);

  const handleExportPng = useCallback(async () => {
    if (!dockRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = await domToPng(dockRef.current, getExportOptions());
      
      const link = document.createElement('a');
      link.download = `MakeDock ${selectedSize}.png`;
      link.href = dataUrl;
      link.click();
      toast('PNG saved successfully!', {
        description: `Exported at ${selectedSize} resolution`,
      });
    } catch (error) {
      console.error('Failed to export PNG:', error);
      toast.error('Failed to export PNG', {
        description: 'Please try again.',
      });
    } finally {
      setIsExporting(false);
    }
  }, [dockRef, selectedSize, getExportOptions]);

  const handleExportSvg = useCallback(async () => {
    if (!dockRef.current) return;
    setIsExporting(true);
    
    try {
      // For SVG, use a solid background color since gradients don't render well
      const svgOptions = {
        scale: sizeMultipliers[selectedSize],
        fetchFn: fetchImageAsDataUrl,
        timeout: 60000,
        backgroundColor: theme.solidColor, // Use theme's solid color
      };
      
      const dataUrl = await domToSvg(dockRef.current, svgOptions);
      
      const link = document.createElement('a');
      link.download = `MakeDock ${selectedSize}.svg`;
      link.href = dataUrl;
      link.click();
      toast('SVG saved successfully!', {
        description: `Exported at ${selectedSize} resolution`,
      });
    } catch (error) {
      console.error('Failed to export SVG:', error);
      toast.error('Failed to export SVG', {
        description: 'Please try again.',
      });
    } finally {
      setIsExporting(false);
    }
  }, [dockRef, selectedSize, theme]);

  const handleCopyImage = useCallback(async () => {
    if (!dockRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = await domToPng(dockRef.current, getExportOptions());
      
      // Convert data URL to blob
      const base64Data = dataUrl.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast('Image copied to clipboard!', {
        description: 'Ready to paste anywhere',
      });
    } catch (error) {
      console.error('Failed to copy image:', error);
      // Fallback: copy the data URL as text
      try {
        const dataUrl = await domToPng(dockRef.current, getExportOptions());
        await navigator.clipboard.writeText(dataUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast('Image URL copied!', {
          description: 'Data URL copied to clipboard',
        });
      } catch {
        toast.error('Failed to copy image', {
          description: 'Please try again.',
        });
      }
    } finally {
      setIsExporting(false);
    }
  }, [dockRef, getExportOptions]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default" 
          className="gap-2 bg-red-600 hover:bg-red-700 text-white"
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
