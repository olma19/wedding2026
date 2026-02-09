# CI/CD: GitHub and Vercel

How tests and deployments work when you use GitHub and Vercel together.

## What’s built-in (Vercel)

When you connect a **GitHub repo** to Vercel:

- **Deploy on push** – Every push to the connected branch (e.g. `main`) triggers a deployment.
- **Build** – Vercel runs your **Build Command** (default: `npm run build`). If the build fails, the deployment fails.
- **No tests by default** – Vercel does **not** run `npm test` or lint. So a broken test suite does not block a deploy unless you change the build.

So: **Vercel’s only built-in “gate” is the build.** Tests and lint only block deploy if you make them part of that build.

## What we added (GitHub Actions)

The repo includes a **GitHub Actions** workflow that runs on every push and pull request to `main`:

- **`.github/workflows/ci.yml`**
  - **Lint & unit tests** – `npm run lint`, `npm run test:run`.
  - **E2E** – `npm run test:e2e` (Playwright; starts the dev server in CI).

This gives you:

- **Fast feedback** on PRs (lint + unit + E2E) before merge.
- **Status checks** in GitHub (e.g. “CI / Lint & unit tests”, “CI / E2E”). You can make these **required** in branch protection so nothing merges until they pass.

GitHub Actions does **not** by itself stop Vercel from deploying. Vercel will still run its build on push. So you have two ways to make tests block deploys (below).

## Making tests block deploys

Pick one (or both).

### Option A: Run tests in Vercel’s build (simplest)

Make the Vercel build fail if lint or tests fail:

1. In **Vercel** → Project → **Settings** → **General** → **Build & Development Settings**.
2. Set **Build Command** to:
   ```bash
   npm run test:run && npm run lint && npm run build
   ```
3. Save. From the next deployment on, a failed test or lint will fail the build and cancel the deploy.

**Pros:** One place (Vercel), no branch protection needed.  
**Cons:** Builds take longer; you rely on Vercel for test feedback (GitHub Actions still gives it earlier on PRs).

### Option B: Require GitHub Actions and (optional) Vercel checks

1. In **GitHub** → Repo → **Settings** → **Branches** → **Branch protection rules** for `main`:
   - Enable **Require status checks to pass before merging**.
   - Select the checks from this repo (e.g. **Lint & unit tests**, **E2E (Playwright)**).
2. Then only commits that pass CI can be merged. Vercel will only deploy what’s already merged (or what you push directly), and you can optionally use [Vercel Deployment Checks](https://vercel.com/docs/checks) to wait for external checks if you want deploy to depend on them.

**Pros:** Clear “CI must pass before merge”; deploys are from green commits.  
**Cons:** Doesn’t by itself stop a direct push to `main` from deploying on Vercel unless you also use Option A or Vercel checks.

### Recommended

- **Option A** – So every Vercel deploy (including direct pushes) only succeeds when tests and lint pass.
- **Keep GitHub Actions** – So PRs get lint + unit + E2E without waiting for Vercel.

## Summary

| Who        | What runs                         | When                    |
|-----------|------------------------------------|-------------------------|
| **Vercel** | Build (default: `npm run build`)   | Every push to main      |
| **GitHub Actions** | Lint, unit tests, E2E        | Every push/PR to main   |

To have tests block deploys: set Vercel **Build Command** to  
`npm run test:run && npm run lint && npm run build` (Option A).
