import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5180',
    viewport: { width: 1280, height: 900 },
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    },
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run preview -- --host 127.0.0.1 --port 5180 --strictPort',
      url: 'http://127.0.0.1:5180',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 5181 --strictPort',
      url: 'http://127.0.0.1:5181',
      reuseExistingServer: !process.env.CI,
      env: {
        VITE_EMAILJS_SERVICE_ID: 'test-service',
        VITE_EMAILJS_TEMPLATE_ID: 'test-template',
        VITE_EMAILJS_PUBLIC_KEY: 'test-public-key',
      },
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 5182 --strictPort',
      url: 'http://127.0.0.1:5182',
      reuseExistingServer: !process.env.CI,
      env: {
        VITE_EMAILJS_SERVICE_ID: '',
        VITE_EMAILJS_TEMPLATE_ID: '',
        VITE_EMAILJS_PUBLIC_KEY: '',
      },
    },
  ],
})
