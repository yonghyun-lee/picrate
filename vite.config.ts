import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), svelte()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api.picrate.xyz',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
