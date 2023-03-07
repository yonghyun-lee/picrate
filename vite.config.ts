import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), svelte()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.37.26.147',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
