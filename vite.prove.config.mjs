import { readFileSync } from 'node:fs';
import { elemix } from '@neuralfog/elemix-vite';
import { defineConfig } from 'vite';

// Proof: build src/CounterApp.ts (a `tpl` component) through the elemix Vite
// plugin. The plugin compiles tpl → view() on the fly; @neuralfog/elemix* is
// left external so the build doesn't need the framework runtime installed.
export default defineConfig({
    plugins: [
        elemix(),
        {
            name: 'print-compiled',
            closeBundle() {
                const out = '.vite-prove/CounterApp.js';
                console.log(`\n── compiled ${out} ──────────────────\n`);
                console.log(readFileSync(out, 'utf8'));
            },
        },
    ],
    build: {
        minify: false,
        outDir: '.vite-prove',
        emptyOutDir: true,
        lib: {
            entry: 'src/CounterApp.ts',
            formats: ['es'],
            fileName: () => 'CounterApp.js',
        },
        rollupOptions: {
            external: [/^@neuralfog\/elemix(\/|$)/],
        },
    },
});
