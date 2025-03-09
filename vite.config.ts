import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/__/auth': {
        target: 'https://auth-test-1e84a.firebaseapp.com',
        changeOrigin: true,
      },
    },
  },
});
