// Loads the published wasm compiler in the browser and compiles live on every
// keystroke — the actual playground use case.
import init, { compile } from '@neuralfog/elemix-compiler-wasm';
import wasmUrl from '@neuralfog/elemix-compiler-wasm/elemix_compiler_bg.wasm?url';

const DEFAULT = [
    "import { Component, defineComponent, state, tpl } from '@neuralfog/elemix';",
    '',
    'export class CounterApp extends Component {',
    '    state = state({ count: 0 });',
    '    increment = () => { this.state.count++; };',
    '',
    '    template = () => tpl`<button @click=${this.increment}>count is ${this.state.count}</button>`;',
    '}',
    '',
    "defineComponent('counter-app', CounterApp);",
].join('\n');

const src = document.querySelector('#src') as HTMLTextAreaElement;
const out = document.querySelector('#out') as HTMLPreElement;

await init({ module_or_path: wasmUrl });

const run = (): void => {
    try {
        out.textContent = compile(src.value);
    } catch (e) {
        out.textContent = `// ${e}`;
    }
};

src.value = DEFAULT;
src.addEventListener('input', run);
run();
