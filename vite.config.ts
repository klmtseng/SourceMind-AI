import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // This is critical: It maps the process.env.API_KEY in your code 
      // to the actual environment variable loaded by Vite.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  }
})