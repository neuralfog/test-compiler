# test-compiler

A throwaway repo to smoke-test the published [`@neuralfog/elemix-compiler`](https://www.npmjs.com/package/@neuralfog/elemix-compiler) on every OS/arch — proves the right prebuilt binary is pulled via `optionalDependencies` and that the `ec` CLI compiles `tpl` templates.

## What's here

- `src/CounterApp.ts` — a minimal elemix component using a `tpl` template.
- `dist/` — the compiled output (generated, gitignored).

## Run it

```sh
pnpm install            # or: npm install
pnpm compile            # runs: ec --dirs src --out dist
```

Equivalently, ad-hoc:

```sh
pnpm exec ec --dirs src --out dist     # npx ec --dirs src --out dist
```

Success = `emitted dist/CounterApp.ts`, where the `tpl\`...\`` template has been
lowered to a `view()` built from `template/clone/_text/_event`.

## Per-platform

`pnpm install` resolves exactly one binary for the host (the rest are skipped by
`os`/`cpu`):

| OS / arch | binary package pulled |
| --- | --- |
| Windows x64 | `@neuralfog/elemix-compiler-win32-x64` |
| Windows arm64 | `@neuralfog/elemix-compiler-win32-arm64` |
| macOS x64 / arm64 | `@neuralfog/elemix-compiler-darwin-{x64,arm64}` |
| Linux x64 / arm64 | `@neuralfog/elemix-compiler-linux-{x64,arm64}` (static musl) |

### Windows

Works out of the box — `pnpm install` then `pnpm compile`. The `.exe` needs no
extra permissions.

### To test the newest dev build

```sh
pnpm up @neuralfog/elemix-compiler@dev && pnpm compile
```
