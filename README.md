# test-compiler

A throwaway repo that smoke-tests the **published** elemix compiler — both delivery
channels, straight off npm:

- **native binary** — [`@neuralfog/elemix-compiler`](https://www.npmjs.com/package/@neuralfog/elemix-compiler), the `ec` CLI (prebuilt per OS/arch).
- **wasm** — [`@neuralfog/elemix-compiler-wasm`](https://www.npmjs.com/package/@neuralfog/elemix-compiler-wasm), compiled live in the browser.

```sh
pnpm install
```

## Native binary — the `ec` CLI

```sh
pnpm compile            # runs: ec --dirs src --out dist
```

Success = `emitted dist/CounterApp.ts`, where the `tpl\`...\`` template in
`src/CounterApp.ts` has been lowered to a `view()` built from
`template/clone/_text/_event`.

`pnpm install` resolves exactly one binary for the host (the rest are skipped by
`os`/`cpu`):

| OS / arch | binary package pulled |
| --- | --- |
| Windows x64 / arm64 | `@neuralfog/elemix-compiler-win32-{x64,arm64}` |
| macOS x64 / arm64 | `@neuralfog/elemix-compiler-darwin-{x64,arm64}` |
| Linux x64 / arm64 | `@neuralfog/elemix-compiler-linux-{x64,arm64}` (static musl) |

Windows works out of the box — the `.exe` needs no extra permissions.

## WASM — compile in the browser

A live playground: type elemix source on the left, see the wasm-compiled output on
the right, recompiled on every keystroke.

```sh
pnpm dev                # vite → http://localhost:5173
```

Headless one-shot proof (node, no browser):

```sh
pnpm prove:wasm         # loads the published wasm, compiles src/CounterApp.ts, prints it
```

## Files

- `src/CounterApp.ts` — a minimal elemix component using a `tpl` template.
- `index.html` + `src/playground.ts` — the wasm browser playground.
- `prove-wasm.mjs` — the headless node proof.
- `dist/` — native `ec` output (generated, gitignored).

## Testing the newest dev build

```sh
pnpm up @neuralfog/elemix-compiler@dev @neuralfog/elemix-compiler-wasm@dev
```
