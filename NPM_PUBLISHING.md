# NPM Publishing Guide

Complete guide for publishing Flowbite MCP Server to npm.

## Prerequisites

1. **npm Account**
   - Create account at https://www.npmjs.com/signup
   - Verify your email address

2. **npm CLI Login**
   ```bash
   npm login
   ```
   Enter your username, password, and email

3. **Package Name Availability**
   ```bash
   npm view flowbite-mcp
   ```
   If it returns 404, the name is available

## Pre-Publish Checklist

### 1. Update Version Number

Edit `package.json`:

```json
{
  "version": "1.0.0"
}
```

Or use npm version:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

### 2. Update CHANGELOG.md

Document all changes in the new version:

```markdown
## [1.0.1] - 2024-12-03
### Fixed
- Fixed data file paths for npm installation
- Added npx support

### Added
- Version and help flags
- Better error messages
```

### 3. Verify Build

```bash
# Clean build
rm -rf build
npm run build

# Test the built package
node build/index.js --version
node build/index.js --help
```

### 4. Test Local Package

```bash
# Create a local package
npm pack

# This creates flowbite-mcp-1.0.0.tgz

# Test installation in another directory
cd /tmp
npm install /path/to/flowbite-mcp-1.0.0.tgz

# Test npx
npx flowbite-mcp --version
npx flowbite-mcp --help
```

### 5. Verify Files to be Published

```bash
# See what will be included
npm pack --dry-run

# Should include:
# - build/
# - data/
# - README.md
# - LICENSE
# - CHANGELOG.md
# - package.json
```

### 6. Run Linting and Tests

```bash
# If you have tests
npm test

# Check for TypeScript errors
npm run build
```

## Publishing

### First Time Publishing

```bash
# Ensure you're logged in
npm whoami

# Publish as public package
npm publish --access public
```

### Subsequent Releases

```bash
# Update version
npm version patch  # or minor, or major

# Build
npm run build

# Publish
npm publish
```

## Post-Publish Steps

### 1. Verify Package

```bash
# Check on npm
npm view flowbite-mcp

# Test installation
npm install -g flowbite-mcp

# Test npx (after a few minutes for CDN propagation)
npx flowbite-mcp --version
```

### 2. Create Git Tag

```bash
# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0
```

### 3. Create GitHub Release

1. Go to https://github.com/themesberg/flowbite-mcp/releases
2. Click "Create a new release"
3. Select the tag you just created
4. Add release notes from CHANGELOG.md
5. Publish release

### 4. Update Documentation

- Verify npx examples in README work
- Update any version-specific documentation
- Test installation instructions

## Unpublishing (Emergency Only)

**⚠️ Warning:** You can only unpublish within 72 hours of publishing.

```bash
# Unpublish specific version
npm unpublish flowbite-mcp@1.0.0

# Unpublish entire package (use with extreme caution)
npm unpublish flowbite-mcp --force
```

## Version Management Best Practices

### Semantic Versioning

- **Patch** (1.0.x): Bug fixes, no breaking changes
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

### Pre-release Versions

For testing before official release:

```bash
# Alpha release
npm version prerelease --preid=alpha
# Result: 1.0.0-alpha.0

# Beta release
npm version prerelease --preid=beta
# Result: 1.0.0-beta.0

# Release candidate
npm version prerelease --preid=rc
# Result: 1.0.0-rc.0

# Publish pre-release
npm publish --tag beta
```

Users install with:
```bash
npm install flowbite-mcp@beta
npx flowbite-mcp@beta
```

## Distribution Tags

```bash
# Publish as latest (default)
npm publish

# Publish with custom tag
npm publish --tag next

# Move tag to different version
npm dist-tag add flowbite-mcp@1.0.1 latest

# List all tags
npm dist-tag ls flowbite-mcp
```

## Package Scope (Organization)

If publishing under an organization:

```json
{
  "name": "@themesberg/flowbite-mcp"
}
```

```bash
npm publish --access public
```

Users would install with:
```bash
npm install @themesberg/flowbite-mcp
npx @themesberg/flowbite-mcp
```

## Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm test || true
      
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` to GitHub repository secrets:
1. Get token from https://www.npmjs.com/settings/[username]/tokens
2. Add to https://github.com/themesberg/flowbite-mcp/settings/secrets

## Common Issues

### Package Name Taken

```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/flowbite-mcp
```

**Solution:** Choose a different name or use scoped package

### Not Logged In

```
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.
```

**Solution:**
```bash
npm login
```

### Version Already Published

```
npm ERR! code E403
npm ERR! 403 You cannot publish over the previously published version
```

**Solution:**
```bash
npm version patch
npm publish
```

### Missing Files in Package

**Solution:** Check `files` field in `package.json` and `.npmignore`

### Large Package Size

```bash
# Check package size
npm pack
ls -lh flowbite-mcp-*.tgz
```

**Optimization:**
- Add large files to `.npmignore`
- Only include necessary files
- Minify if appropriate

## Package Monitoring

### Download Stats

```bash
# Install download stats tool
npm install -g npm-stat

# View stats
npm-stat flowbite-mcp

# Or visit
# https://www.npmjs.com/package/flowbite-mcp
```

### Deprecation

If you need to deprecate a version:

```bash
npm deprecate flowbite-mcp@1.0.0 "This version has critical bugs, please upgrade to 1.0.1"
```

## Support Channels

After publishing, monitor:
- GitHub Issues
- npm package page comments
- Discord community
- Email support

## Maintenance Schedule

1. **Security Updates:** Immediate
2. **Bug Fixes:** Weekly
3. **Minor Features:** Monthly
4. **Major Releases:** Quarterly

## Checklist Before npm publish

- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Tests pass (if any)
- [ ] Build successful
- [ ] Local package test (npm pack)
- [ ] README accurate
- [ ] LICENSE file present
- [ ] Logged into npm
- [ ] No sensitive data in package
- [ ] Data files included
- [ ] Git committed and pushed
- [ ] Ready to create GitHub release

## Publishing Command

```bash
# Final command
npm publish --access public
```

🎉 **Your package is now live on npm!**

Users can immediately use:
```bash
npx flowbite-mcp
```

---

For questions or issues, see:
- [npm documentation](https://docs.npmjs.com/)
- [GitHub repository](https://github.com/themesberg/flowbite-mcp)

