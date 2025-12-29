export interface Theme {
  id: string;
  name: string;
  gradient: string;
  solidColor: string; // For SVG export fallback
  dotColor: string; // Color indicator in dropdown
}

export const themes: Theme[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    gradient: 'linear-gradient(180deg, #2c5364 0%, #203a43 50%, #0f2027 100%)',
    solidColor: '#1a2f38',
    dotColor: '#203a43',
  },
  {
    id: 'ice',
    name: 'Ice',
    gradient: 'linear-gradient(180deg, #83a4d4 0%, #b6fbff 100%)',
    solidColor: '#9dc8e0',
    dotColor: '#83a4d4',
  },
  {
    id: 'sand',
    name: 'Sand',
    gradient: 'linear-gradient(180deg, #e6b980 0%, #eacda3 100%)',
    solidColor: '#e5c591',
    dotColor: '#e6b980',
  },
  {
    id: 'forest',
    name: 'Forest',
    gradient: 'linear-gradient(180deg, #134e5e 0%, #71b280 100%)',
    solidColor: '#428c6f',
    dotColor: '#3d6b59',
  },
  {
    id: 'mono',
    name: 'Mono',
    gradient: 'linear-gradient(180deg, #bdc3c7 0%, #2c3e50 100%)',
    solidColor: '#74838b',
    dotColor: '#bdc3c7',
  },
  {
    id: 'breeze',
    name: 'Breeze',
    gradient: 'linear-gradient(180deg, #ee9ca7 0%, #ffdde1 100%)',
    solidColor: '#f6bdc4',
    dotColor: '#ee9ca7',
  },
  {
    id: 'candy',
    name: 'Candy',
    gradient: 'linear-gradient(180deg, #a770ef 0%, #cf8bf3 50%, #fdb99b 100%)',
    solidColor: '#cf8bf3',
    dotColor: '#a770ef',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    gradient: 'linear-gradient(180deg, #ed4264 0%, #ffedbc 100%)',
    solidColor: '#f09690',
    dotColor: '#ed4264',
  },
  {
    id: 'falcon',
    name: 'Falcon',
    gradient: 'linear-gradient(180deg, #74ebd5 0%, #acb6e5 100%)',
    solidColor: '#90d1dd',
    dotColor: '#8fa4d4',
  },
  {
    id: 'meadow',
    name: 'Meadow',
    gradient: 'linear-gradient(180deg, #89f7fe 0%, #66a6ff 100%)',
    solidColor: '#78cfff',
    dotColor: '#7ed957',
  },
  {
    id: 'raindrop',
    name: 'Raindrop',
    gradient: 'linear-gradient(180deg, #1488cc 0%, #2b32b2 100%)',
    solidColor: '#1f5d9f',
    dotColor: '#1488cc',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    gradient: 'linear-gradient(180deg, #f56217 0%, #f7b733 100%)',
    solidColor: '#f68c25',
    dotColor: '#f56217',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: 'linear-gradient(180deg, #7f00ff 0%, #e100ff 100%)',
    solidColor: '#b800ff',
    dotColor: '#7f00ff',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    gradient: 'linear-gradient(180deg, #2e3192 0%, #1bffff 100%)',
    solidColor: '#2498c9',
    dotColor: '#2e3192',
  },
];

export const defaultTheme = themes[0];
