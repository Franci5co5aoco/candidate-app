import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
  transformIgnorePatterns: [
    'node_modules/(?!@angular|rxjs|tslib)' // <-- allow Angular and rxjs ESM packages
  ],
});
