import { defineConfig } from 'cf/config';

export default defineConfig({
  accountId: '8ec88b36a424117451b5fbba3471f657',
  worker: {
    name: 'notestack',
    domains: ['notestack.shop'],
    compatibilityDate: '2026-11-15',
    assets: { htmlHandling: 'force-trailing-slash', notFoundHandling: '404-page' },
    observability: { enabled: true, traces: { enabled: true } },
  },
});
