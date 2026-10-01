import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // StackBlitz/Cloudflare use root; GitHub Pages uses the repository subpath.
  base: mode === 'pages' ? '/otra-noche-web/' : '/',
}));
