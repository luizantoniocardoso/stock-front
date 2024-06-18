import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@Components': '/src/Components',
      '@Hooks': '/src/Hooks',
      '@Schemas': '/src/Schemas',
      '@Pages': '/src/Pages',
      '@layouts': '/src/Layouts',
      '@env': '/src/Enviroments.ts'
    }
  }
})
