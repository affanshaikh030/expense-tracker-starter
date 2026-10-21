---
name: deploy
description: >-
  Use this skill whenever deploying the application, preparing a release,
  running the deployment pipeline, or deploying to the staging area.
  Ensures all tests pass first, builds the production bundle, and pushes to the staging area.
---

# Deploy Skill

This skill defines the standardized deployment procedure for the project.

## Deployment Principles

1. **Test First**: Never deploy without all tests and code quality checks passing.
2. **Deterministic Build**: Ensure the production bundle compiles with zero errors.
3. **Staged Deployment**: Push verified release assets to the staging area.

---

## Deployment Workflow

### Step 1: Run All Tests

Execute the test suite to ensure code health and prevent regressions:

```bash
npm test
```

- **Validation**:
  - Command must finish with exit code `0`.
  - If any test or lint check fails, **abort the deployment immediately**.
  - Resolve all failures before re-initiating the deployment.

### Step 2: Build the Production Bundle

Generate optimized production artifacts:

```bash
npm run build
```

- **Validation**:
  - The build must exit with code `0`.
  - Confirm that the `dist/` directory is created/updated with the production bundle (`index.html`, minified JavaScript, and CSS).

### Step 3: Push to the Staging Area

Once tests have passed and the production bundle is verified, push to the staging area:

1. **Inspect Working Tree**:
   ```bash
   git status
   ```

2. **Stage Changes**:
   Stage any pending deployment or release changes:
   ```bash
   git add -A
   ```

3. **Commit Release (if needed)**:
   ```bash
   git commit -m "chore(release): prepare deployment bundle"
   ```

4. **Push to Staging**:
   Push the changes to the staging branch / remote:
   ```bash
   git push origin HEAD:staging
   ```

- **Validation**:
  - Confirm Git reports successful transmission to the staging branch.
  - Check that the staging deployment pipeline triggers as expected.

---

## Helper Automation Scripts

Automated deployment scripts encapsulating all three steps are located in `scripts/`:

- **PowerShell (Windows)**: [deploy.ps1](./scripts/deploy.ps1)
- **Bash (Linux/macOS)**: [deploy.sh](./scripts/deploy.sh)

Run directly from workspace root:
```powershell
.\.agents\skills\deploy\scripts\deploy.ps1
```
```bash
./.agents/skills/deploy/scripts/deploy.sh
```
