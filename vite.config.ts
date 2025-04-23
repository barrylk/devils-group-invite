import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // You can remove this if you're using the default root
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
  },
  build: {
    outDir: 'dist',
    // Remove rollupOptions.input if index.html is at root
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: ['devils-group-invite.onrender.com'],
  },
});
