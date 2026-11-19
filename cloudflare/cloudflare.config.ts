import { bindings, defineConfig } from 'cf/config';

export default defineConfig({
  accountId: '8ec88b36a424117451b5fbba3471f657',
  worker: {
    name: 'notestack',
    entrypoint: './src/worker.ts',
    domains: ['notestack.shop'],
    compatibilityDate: '2026-11-15',
    // /api/* goes to the Worker (accounts and sessions); everything else is the static site.
    assets: { htmlHandling: 'force-trailing-slash', notFoundHandling: '404-page', runWorkerFirst: ['/api/*', '/learn/*'] },
    env: {
      ASSETS: bindings.assets(),
      // Accounts, sessions and (later) purchases. Created automatically on first deploy.
      DB: bindings.d1({ name: 'notestack-accounts' }),
      // Password reset emails (resend.com). Set with: cf workers secrets update RESEND_API_KEY
      RESEND_API_KEY: bindings.secret(),
      EMAIL_FROM: bindings.text('NoteStack <no-reply@notestack.shop>'), ADMIN_EMAILS: bindings.text('admin@botlane.io'),
    },
    observability: { enabled: true, traces: { enabled: true } },
  },
});
