// Proof the published wasm compiler works end to end:
// install from npm → load the wasm → compile a real component.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import init, { compile } from '@neuralfog/elemix-compiler-wasm';

// web-target wasm: feed it the bytes (node has no fetch for file URLs).
const require = createRequire(import.meta.url);
const wasm = readFileSync(
    require.resolve('@neuralfog/elemix-compiler-wasm/elemix_compiler_bg.wasm'),
);
await init({ module_or_path: wasm });

const source = readFileSync('src/CounterApp.ts', 'utf8');
const out = compile(source);

console.log('── input ───────────────────────────────────────');
console.log(source);
console.log('── compiled by wasm ────────────────────────────');
console.log(out);
console.log('────────────────────────────────────────────────');

const ok =
    out.includes("from '@neuralfog/elemix/runtime'") &&
    out.includes('view()') &&
    !out.includes('tpl`');
console.log(ok ? '✅ wasm compiled it' : '❌ unexpected output');
process.exit(ok ? 0 : 1);
