'use client';

import React, { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import type { DockApp } from '@/lib/dock-apps';

interface SortableAppItemProps {
  app: DockApp;
  onRemove: (id: string) => void;
  isLocked?: boolean;
}

export function SortableAppItem({ app, onRemove, isLocked = false }: SortableAppItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id, disabled: isLocked });

  const style = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  }), [transform, transition, isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      className="group relative"
    >
      <div
        {...(isLocked ? {} : { ...attributes, ...listeners })}
        className={`flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white p-1.5 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 ${isLocked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
      >
        <img
          src={app.icon}
          alt={app.name}
          className="h-12 w-12 object-contain pointer-events-none"
          draggable={false}
        />
      </div>
      {!isLocked && (
        <button
          type="button"
          onClick={() => onRemove(app.id)}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
          aria-label={`Remove ${app.name}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
