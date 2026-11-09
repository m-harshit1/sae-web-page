const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'app', 'api');
const backupDir = path.join(__dirname, '..', '.api_backup');

let moved = false;
try {
  if (fs.existsSync(apiDir)) {
    console.log('Temporarily moving app/api to .api_backup for static export...');
    fs.renameSync(apiDir, backupDir);
    moved = true;
  }

  // Clear stale .next dev types cache that might reference removed app/api routes
  const dotNext = path.join(__dirname, '..', '.next');
  if (fs.existsSync(dotNext)) {
    fs.rmSync(dotNext, { recursive: true, force: true });
    console.log('Cleaned stale .next cache directory.');
  }

  console.log('Running Next.js static export build...');
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_EXPORT: 'true',
      BASE_PATH: process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/sae-web-page' : '')
    }
  });

  const outDir = path.join(__dirname, '..', 'out');
  if (fs.existsSync(outDir)) {
    // Add .nojekyll so GitHub Pages doesn't ignore _next directory
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    console.log('Created out/.nojekyll for GitHub Pages compatibility.');
  }

  console.log('Static export completed successfully into ./out');
} catch (err) {
  console.error('Error during static export build:', err);
  process.exitCode = 1;
} finally {
  if (moved && fs.existsSync(backupDir)) {
    console.log('Restoring app/api from .api_backup...');
    fs.renameSync(backupDir, apiDir);
    console.log('Restored app/api successfully.');
  }
}

