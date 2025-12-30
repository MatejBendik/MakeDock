<div align="center">
  <img src="public/logo.png" alt="MakeDock Logo" width="80" height="80" style="border-radius: 16px;" />
  <h1>MakeDock</h1>
  <p><strong>Create beautiful macOS dock images in seconds</strong></p>
  
  <p>
    <a href="https://makedock.app">Live Demo</a> •
    <a href="https://www.producthunt.com/posts/makedock">Product Hunt</a> •
    <a href="https://twitter.com/BendikMatej">Twitter</a>
  </p>

  <img src="public/preview.png" alt="MakeDock Preview" width="100%" />
</div>

---

## ✨ Features

- **🎨 14 Beautiful Themes** — Gradient backgrounds inspired by ray.so
- **🖱️ Drag & Drop** — Reorder apps with smooth drag and drop
- **📱 Popular Apps** — Pre-loaded with popular macOS app icons
- **🔗 Custom Icons** — Add any app via image URL
- **💡 Open Indicators** — Toggle "open" dots under apps
- **📤 Multiple Export Options** — PNG, SVG, or copy to clipboard
- **📐 Size Options** — Export at 2x, 4x, or 6x resolution
- **🆓 100% Free** — No sign-up, no watermarks, no limits

## 🚀 Why MakeDock?

I searched everywhere for a tool to create custom macOS dock mockups — "macOS dock creator", "dock image generator", "custom dock image"... nothing existed.

So I built MakeDock. Whether you're:

- 🎨 A **designer** creating mockups
- 📺 A **content creator** showing your setup
- 💬 Someone sharing their **dream dock** on social media

This tool is for you.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
- **Export:** [modern-screenshot](https://github.com/qq15725/modern-screenshot)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/MatejBendik/MakeDock.git

# Navigate to the directory
cd makedock

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
makedock/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dock-builder.tsx    # Main dock builder component
│   ├── app-selector.tsx    # App selection dropdown
│   ├── export-menu.tsx     # Export options menu
│   ├── theme-selector.tsx  # Theme picker
│   └── sortable-app-item.tsx # Draggable app item
├── lib/
│   ├── dock-apps.ts        # App definitions and icons
│   ├── themes.ts           # Theme configurations
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🎨 Available Themes

| Theme | Preview |
|-------|---------|
| Midnight | Dark blue gradient |
| Ice | Light blue gradient |
| Sand | Warm beige gradient |
| Forest | Deep green gradient |
| Mono | Grayscale gradient |
| Breeze | Sky blue gradient |
| Candy | Pink gradient |
| Crimson | Red gradient |
| Falcon | Purple gradient |
| Meadow | Light green gradient |
| Raindrop | Cyan gradient |
| Sunset | Orange gradient |
| Aurora | Teal gradient |
| Ocean | Deep blue gradient |

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Ideas for Future Features

- [ ] Windows taskbar support
- [ ] More icon packs
- [ ] Custom background upload
- [ ] Share links
- [ ] Animated GIF export

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [macOS Icons](https://macosicons.com/) for inspiration
- [ray.so](https://ray.so/) for theme inspiration
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components

---

<div align="center">
  <p>Made with ❤️ by <a href="https://twitter.com/BendikMatej">Matej Bendík</a></p>
  <p>If you found this useful, consider giving it a ⭐</p>
</div>
