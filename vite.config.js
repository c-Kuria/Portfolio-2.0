import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: false,
    open: true,
    cors: true,
    force: true,
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 3000,
    strictPort: false
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          animations: ['framer-motion', 'aos', 'gsap']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name.includes('vendor')) {
            return 'assets/vendor/[name].[hash].js';
          }
          return 'assets/chunks/[name].[hash].js';
        },
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    manifest: true,
    modulePreload: {
      polyfill: true
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled'
    ]
  },
  commonjsOptions: {
    include: [/node_modules/],
    extensions: ['.js', '.cjs'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:5]'
    }
  }
})

