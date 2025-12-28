'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus, Search, ImageIcon, Link } from 'lucide-react';
import { availableApps, type DockApp } from '@/lib/dock-apps';

interface AppSelectorProps {
  selectedApps: DockApp[];
  onAddApp: (app: DockApp) => void;
}

// Check if string is a valid image URL
function isImageUrl(str: string): boolean {
  try {
    const url = new URL(str.trim());
    return (url.protocol === 'http:' || url.protocol === 'https:');
  } catch {
    return false;
  }
}

export function AppSelector({ selectedApps, onAddApp }: AppSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [customAppName, setCustomAppName] = useState('');

  const selectedIds = new Set(selectedApps.map((app) => app.id));

  const isUrl = useMemo(() => isImageUrl(searchQuery), [searchQuery]);

  const filteredApps = availableApps.filter(
    (app) =>
      !selectedIds.has(app.id) &&
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddApp = useCallback((app: DockApp) => {
    onAddApp(app);
    setIsOpen(false);
    setSearchQuery('');
    setCustomAppName('');
  }, [onAddApp]);

  const handleAddCustomApp = useCallback(() => {
    if (!isUrl) return;
    
    const customApp: DockApp = {
      id: `custom-${Date.now()}`,
      name: customAppName.trim() || 'Custom App',
      icon: searchQuery.trim(),
      isCustom: true,
    };
    
    onAddApp(customApp);
    setIsOpen(false);
    setSearchQuery('');
    setCustomAppName('');
    setImageError(false);
  }, [isUrl, searchQuery, customAppName, onAddApp]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setImageError(false);
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-16 w-16 rounded-xl border-dashed border-2 border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
        >
          <Plus className="h-6 w-6 text-zinc-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 max-h-96 overflow-hidden" onCloseAutoFocus={(e) => e.preventDefault()}>
        <div className="px-2 py-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search or paste image URL..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.stopPropagation()}
              className="w-full rounded-md border border-input bg-transparent px-8 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
              autoFocus
            />
          </div>
          
          {/* Custom URL Preview */}
          {isUrl && (
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                <Link className="h-3 w-3" />
                <span>Custom icon from URL</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-600">
                  {!imageError ? (
                    <img
                      src={searchQuery.trim()}
                      alt="Preview"
                      className="h-full w-full object-contain"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-zinc-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="App name..."
                    value={customAppName}
                    onChange={(e) => setCustomAppName(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === 'Enter' && !imageError) {
                        handleAddCustomApp();
                      }
                    }}
                    className="w-full rounded border border-input bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              {imageError ? (
                <p className="mt-2 text-xs text-red-500">Failed to load image</p>
              ) : (
                <Button
                  size="sm"
                  className="w-full mt-2"
                  onClick={handleAddCustomApp}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Dock
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* App list - show when not entering URL */}
        {!isUrl && (
          <div className="max-h-56 overflow-y-auto">
            {filteredApps.length === 0 ? (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                {searchQuery ? 'No apps found. Try pasting an image URL!' : 'All apps added'}
              </div>
            ) : (
              filteredApps.map((app) => (
                <DropdownMenuItem
                  key={app.id}
                  onClick={() => handleAddApp(app)}
                  className="cursor-pointer gap-3 px-2 py-2"
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-8 w-8 object-contain"
                  />
                  <span>{app.name}</span>
                </DropdownMenuItem>
              ))
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
