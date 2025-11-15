import { defineConfig } from 'tsdown';

export default defineConfig({
    clean: true,
    dts: true,
    entry: {
        index: 'src/index.ts',
    },
    format: ['esm'],
    outDir: 'dist',
    platform: 'neutral',
    sourcemap: true,
    target: 'esnext',
});
