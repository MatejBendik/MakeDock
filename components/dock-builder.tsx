'use client';

import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { MacOSDock } from '@/components/ui/shadcn-io/mac-os-dock';
import { SortableAppItem } from '@/components/sortable-app-item';
import { AppSelector } from '@/components/app-selector';
import { ExportMenu } from '@/components/export-menu';
import { defaultApps, type DockApp } from '@/lib/dock-apps';

export function DockBuilder() {
  const [apps, setApps] = useState<DockApp[]>(defaultApps);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const dockPreviewRef = useRef<HTMLDivElement>(null);
  const dndContextId = useId();

  // Only render DndContext after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setApps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        // Prevent moving items before Finder (index 0)
        if (newIndex === 0) return items;
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const handleAddApp = useCallback((app: DockApp) => {
    setApps((prev) => [...prev, app]);
  }, []);

  const handleRemoveApp = useCallback((appId: string) => {
    setApps((prev) => prev.filter((app) => app.id !== appId));
  }, []);

  const handleAppClick = useCallback((appId: string) => {
    setOpenApps((prev) => 
      prev.includes(appId) 
        ? prev.filter((id) => id !== appId) 
        : [...prev, appId]
    );
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="w-full px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">
            MakeDock
          </h1>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 98 96"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
          </a>
        </div>
      </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-start gap-8 px-6 py-12">
        {/* App Editor Section */}
        <section className="w-full max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Drag and drop to sort
            </span>
            <svg
              className="h-4 w-4 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 7l10 10M17 7v10H7" />
            </svg>
          </div>

          {mounted ? (
            <DndContext
              id={dndContextId}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={apps.map((app) => app.id)}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex flex-wrap items-center gap-4">
                  {apps.map((app, index) => (
                    <SortableAppItem
                      key={app.id}
                      app={app}
                      onRemove={handleRemoveApp}
                      isLocked={index === 0 && app.id === 'finder'}
                    />
                  ))}
                  {apps.length < 24 && (
                    <AppSelector selectedApps={apps} onAddApp={handleAddApp} />
                  )}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="flex flex-wrap items-center gap-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white p-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-12 w-12 object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Preview Section */}
        <section className="w-full max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Preview
            </span>
            {mounted && <ExportMenu dockRef={dockPreviewRef} />}
          </div>

          <div 
            ref={dockPreviewRef}
            className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
          >
            {/* macOS-like desktop background */}
            <div 
              className="flex min-h-[500px] items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #2c5364 0%, #203a43 50%, #0f2027 100%)',
              }}
            >
              <div className="flex items-center justify-center p-8">
                {apps.length > 0 ? (
                  <MacOSDock
                    apps={apps}
                    onAppClick={handleAppClick}
                    openApps={openApps}
                  />
                ) : (
                  <div className="flex h-20 items-center justify-center rounded-2xl bg-zinc-800/50 px-8 backdrop-blur-md">
                    <span className="text-sm text-zinc-400">
                      Add apps to see the dock preview
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center">
        <p className="text-sm text-black">
          Made with{' '}
          <span className="text-red-500">❤</span>
          {' '}by{' '}
          <a
            href="https://github.com/matejbendik"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-700 hover:underline"
          >
            Matej Bendík
          </a>
        </p>
      </footer>
    </div>
  );
}
