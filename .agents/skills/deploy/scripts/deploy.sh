#!/usr/bin/env bash
# Automated Deploy Script to Staging
set -e

echo ""
echo "[1/3] Running tests..."
npm test
echo "Tests passed successfully."

echo ""
echo "[2/3] Building production bundle..."
npm run build
echo "Production bundle built in dist/."

echo ""
echo "[3/3] Pushing to staging area..."
git add -A
git status

echo "Pushing to origin HEAD:staging..."
git push origin HEAD:staging

echo ""
echo "==> Deployment to staging completed successfully!"
