# JIRA Ticket Draft for INFOSEC

## Title
Enable "Write" GHCR/Packages Permission for GitHub Actions in singlestore-labs/demo-realtime-digital-marketing

## Type
INFOSEC Request

## Priority
Medium

## Tags
@fgodinho @pmagalhaes @tfly @jribeiro

## Description

### Summary
Requesting approval to enable "Write" permission for GitHub Packages (GHCR) for the GitHub Actions workflow in the `singlestore-labs/demo-realtime-digital-marketing` repository. The workflow currently fails when attempting to push Docker images to `ghcr.io/singlestore-labs/demo-realtime-digital-marketing` due to org-level policy restrictions.

### Background
The repository has a GitHub Actions workflow (`.github/workflows/build-image.yml`) that builds and publishes Docker images to GitHub Container Registry (GHCR) on pushes to the `main` branch. The workflow is properly configured with:
- `permissions: packages: write` and `contents: read` in the job definition
- Authentication using `${{ secrets.GITHUB_TOKEN }}`
- Scoped to only run on the upstream `singlestore-labs/demo-realtime-digital-marketing` repository (not forks)

However, the workflow fails with permission errors when attempting to push to GHCR. Investigation revealed that the repository-level "Read and write permissions" toggle in Settings → Actions → General → Workflow permissions is greyed out, indicating an organization-level policy override is blocking the required permissions.

### Current Error
```
Error: buildx failed with: error: failed to solve: failed to push ghcr.io/singlestore-labs/demo-realtime-digital-marketing:latest: insufficient_scope: authorization failed
```

### Precedent
This request follows the same pattern as **INFOSEC-2859**, where a similar org-level policy was blocking GitHub Actions in `memsql/memsql`. The resolution in that case was to grant the requested permissions with confirmation that the change scopes the GHA bot to only the specific repository, not org-wide access.

### Requested Action
Please enable "Write" permission for GitHub Packages (GHCR) for GitHub Actions workflows in the `singlestore-labs/demo-realtime-digital-marketing` repository.

### Scope & Security Considerations
- **Repository-scoped**: The permission change applies only to `singlestore-labs/demo-realtime-digital-marketing`, not the entire `singlestore-labs` organization
- **Workflow-scoped**: The workflow explicitly checks `github.repository == 'singlestore-labs/demo-realtime-digital-marketing'` to prevent execution on forks
- **Authentication**: Uses the standard `GITHUB_TOKEN` secret, which is automatically scoped to the repository
- **Use case**: Legitimate automation need to publish demo application Docker images for easy deployment

### References
- Current workflow: `.github/workflows/build-image.yml` in `singlestore-labs/demo-realtime-digital-marketing`
- Precedent ticket: INFOSEC-2859
- GitHub Documentation: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository

### Reviewers
- @fgodinho (INFOSEC approver)
- @pmagalhaes (Infra/Security)
- @tfly (Infra/Security)
- @jribeiro (Infra/Security)

---

**Reporter:** Amanda Kwong (akwong)  
**Date:** 2026-06-30
