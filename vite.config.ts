import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deploying to the ROOT of the learn.codehuntspk.com subdomain,
// so base stays '/'. If you ever deploy into a sub-folder instead
// (e.g. codehuntspk.com/learn/), change base to '/learn/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
