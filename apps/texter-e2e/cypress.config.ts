import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: { default: 'nx run texter:start' },
      ciWebServerCommand: 'nx run texter:serve-static',
    }),
    baseUrl: 'http://localhost:3000',
  },
});
