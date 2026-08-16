import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deployed as a GitHub Pages *organisation* site from the repo
// fulcrumgo/fulcrumgo.github.io, which serves at the domain root, so assets
// need no path prefix. If this ever moves to a project repo or a subpath,
// set this to '/<repo>/' and update `org.url` in src/data/site.js to match.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: { port: 5178 },
  build: {
    // Slightly smaller, and we have no need for legacy sourcemap tooling.
    sourcemap: false,
  },
})
