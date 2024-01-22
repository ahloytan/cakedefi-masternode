import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      output:{
          manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('@mui')) return '@mui';
                if (id.includes('chart.js')) return 'chart-js';
              }
          }
      }
    }
  },
  resolve: {
    alias: {
      assets: "../../build",
    },
  },
})
