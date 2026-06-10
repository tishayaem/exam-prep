import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/exam-prep/',
  plugins: [
    react(),
    // Installable PWA. The point on the target iPad is twofold: a home-screen
    // app without Safari chrome, and — critically — exemption from Safari's
    // 7-day script-writable-storage eviction, which would otherwise wipe the
    // localStorage progress after any fortnight away from the site.
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Revision — Year 5 · 11+ prep',
        short_name: 'Revision',
        description:
          'Maths, English, Science and reasoning practice for the 11+.',
        // Relative URLs resolve against the manifest's own /exam-prep/ path,
        // so the same config works in dev, preview and on GitHub Pages.
        start_url: '.',
        scope: '.',
        display: 'standalone',
        theme_color: '#FFFFFF',
        background_color: '#FFFFFF',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png}'],
        // The Google Fonts faces aren't in dist, so precache can't cover them:
        // cache the stylesheet as it's fetched and the font binaries for a
        // year, keeping the app's typography intact offline.
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Three stable chunks — vendor / question bank / app — so a content
        // edit doesn't make the service worker re-download React, and an app
        // tweak doesn't re-download the whole question bank.
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('/src/data/') || id.includes('/src/diagrams/'))
            return 'content';
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
