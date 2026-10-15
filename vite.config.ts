import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages serves this project from /ds_website/, not from the domain root.
// Keep local development at / while emitting correctly rooted production assets.
const base = process.env.GITHUB_ACTIONS ? '/ds_website/' : '/';

export default defineConfig({ base, plugins: [react(), tailwindcss()], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } });
