import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // Ensure Vite looks in the right directory
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ← bind to all network interfaces
    port: process.env.PORT || 5173, // ← use Render's provided port
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './public/index.html', // Explicitly set the entry point
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: ['devils-group-invite.onrender.com'] // 👈 Add your Render domain here
    },
    
  },
});
