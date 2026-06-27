import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// The Cloudflare plugin runs worker/index.ts in dev (via workerd), so /api/chat
// is handled by the Worker in both dev and production — no proxy needed.
export default defineConfig({
  plugins: [react(), cloudflare()],
})