# Automated Deploy Script to Staging
$ErrorActionPreference = "Stop"

Write-Host "`n[1/3] Running tests..." -ForegroundColor Cyan
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Error "Tests failed! Deployment aborted."
    exit 1
}
Write-Host "Tests passed successfully." -ForegroundColor Green

Write-Host "`n[2/3] Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Production build failed! Deployment aborted."
    exit 1
}
Write-Host "Production bundle built in dist/." -ForegroundColor Green

Write-Host "`n[3/3] Pushing to staging area..." -ForegroundColor Cyan
git add -A
git status

Write-Host "Pushing to origin HEAD:staging..." -ForegroundColor Cyan
git push origin HEAD:staging

Write-Host "`n==> Deployment to staging completed successfully!" -ForegroundColor Green
