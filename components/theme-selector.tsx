'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { themes, type Theme } from '@/lib/themes';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
          <div
            className="h-4 w-4 rounded-full border border-zinc-300 dark:border-zinc-600"
            style={{ background: selectedTheme.gradient }}
          />
          <span className="text-sm font-medium">{selectedTheme.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className="gap-3 cursor-pointer"
          >
            <div
              className="h-5 w-5 rounded-full border border-zinc-200 dark:border-zinc-600 shadow-sm"
              style={{ background: theme.gradient }}
            />
            <span className={selectedTheme.id === theme.id ? 'font-medium' : ''}>
              {theme.name}
            </span>
            {selectedTheme.id === theme.id && (
              <svg
                className="ml-auto h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
