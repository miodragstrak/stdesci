import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';
import { Buffer } from 'buffer';

export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    rollupOptions: {
      external: [
        'eventemitter3',  // Dodaj ovu biblioteku kao eksternu ako je potrebno
        'buffer', // Dodaj buffer kao eksternu
        '@solana/web3.js',  // Dodaj @solana/web3.js kao eksterni modul
      ],
      output: {
        globals: {
          eventemitter3: 'EventEmitter',
          buffer: 'Buffer',  // Ovdje definiši globalnu vrednost za Buffer
          '@solana/web3.js': 'solanaWeb3',  // Definiši @solana/web3.js kao globalnu varijablu
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'fix-buffer',
          setup(build) {
            build.onResolve({ filter: /^buffer$/ }, args => {
              return { path: args.path, external: true };
            });
          },
        },
      ],
    },
  },
  define: {
    global: 'window',  // Osiguraj da global objekat bude definisan
    Buffer: 'buffer.Buffer',  // Osiguraj da je Buffer dostupan u browser-u
  },
});