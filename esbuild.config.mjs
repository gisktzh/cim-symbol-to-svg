import esbuild from 'esbuild'
import path from 'path'

const outDir = path.resolve('./dist')

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: path.join(outDir, 'index.js'),
    sourcemap: true,
    minify: true,
    loader: {},
    external: [],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    alias: {
      '@': path.resolve('./src'),
    },
  })
  .catch(() => process.exit(1))
