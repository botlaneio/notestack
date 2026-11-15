import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';

// Copy Next's finished export verbatim; Vite does not transform the storefront.
export default defineConfig({
  root: import.meta.dirname,
  publicDir: '../out',
  plugins: [cloudflare()],
});
