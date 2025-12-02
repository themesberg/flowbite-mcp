# Docker Deployment Guide

Complete guide for deploying Flowbite MCP Server with Docker.

## Quick Start

```bash
# Build and run with Docker Compose
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## How the Multi-Stage Build Works

The Dockerfile uses a two-stage build process for optimal image size and security:

### Stage 1: Builder
- Installs **all** dependencies (including dev dependencies like TypeScript)
- Compiles TypeScript to JavaScript
- Creates the `build/` directory with compiled code

### Stage 2: Production
- Installs **only** production dependencies (smaller, faster)
- Copies only the compiled `build/` directory from the builder stage
- Copies the `data/` directory for component documentation
- Results in a lean production image

## Building the Docker Image

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# Rebuild after code changes
docker-compose up -d --build

# View logs
docker-compose logs -f flowbite-mcp

# Stop and remove
docker-compose down
```

### Option 2: Using Docker CLI

```bash
# Build the image
docker build -t flowbite-mcp .

# Run the container
docker run -d \
  --name flowbite-mcp \
  -p 3000:3000 \
  -e MCP_TRANSPORT_MODE=sse \
  flowbite-mcp

# View logs
docker logs -f flowbite-mcp

# Stop and remove
docker stop flowbite-mcp
docker rm flowbite-mcp
```

## Configuration

### Environment Variables

Configure the server using environment variables:

```yaml
# docker-compose.yml
services:
  flowbite-mcp:
    environment:
      - MCP_TRANSPORT_MODE=sse
      - MCP_PORT=3000
      - MCP_HOST=0.0.0.0
      - NODE_ENV=production
```

Or with Docker CLI:

```bash
docker run -d \
  -p 3000:3000 \
  -e MCP_TRANSPORT_MODE=sse \
  -e MCP_PORT=3000 \
  -e NODE_ENV=production \
  flowbite-mcp
```

### Port Mapping

Change the host port (left side) to expose on a different port:

```bash
# Run on port 8080 instead of 3000
docker run -p 8080:3000 flowbite-mcp

# Access at http://localhost:8080
```

Or in `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # host:container
```

## Health Checks

The container includes automatic health monitoring:

```bash
# Check container health
docker ps

# Should show "healthy" in STATUS column
# Example: Up 2 minutes (healthy)
```

Health check endpoint:

```bash
curl http://localhost:3000/health
# Response: {"status":"ok","transport":"sse","timestamp":"..."}
```

## Volume Mounts (Optional)

Mount the data directory to update documentation without rebuilding:

```yaml
# docker-compose.yml
volumes:
  - ./data:/app/data:ro  # Read-only mount
```

Or with Docker CLI:

```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data:ro \
  flowbite-mcp
```

## Troubleshooting

### Build Fails with "tsc: not found"

**Problem:** The old Dockerfile was trying to build with only production dependencies.

**Solution:** The new multi-stage Dockerfile (already applied) fixes this by:
1. Installing all dependencies in the builder stage
2. Building the TypeScript code
3. Copying only the compiled code to the production stage

If you still see this error, pull the latest Dockerfile.

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000

# Use a different port
docker run -p 3001:3000 flowbite-mcp
```

### Container Exits Immediately

Check the logs:

```bash
# Docker Compose
docker-compose logs flowbite-mcp

# Docker CLI
docker logs flowbite-mcp
```

Common issues:
- Port conflict: Use a different host port
- Invalid environment variables: Check your configuration
- Missing files: Rebuild the image with `docker-compose up -d --build`

### Cannot Connect to Server

1. **Check container is running:**
   ```bash
   docker ps
   # Should show flowbite-mcp container
   ```

2. **Check health:**
   ```bash
   curl http://localhost:3000/health
   ```

3. **Check logs:**
   ```bash
   docker-compose logs -f flowbite-mcp
   ```

4. **Verify port mapping:**
   ```bash
   docker port flowbite-mcp
   # Should show: 3000/tcp -> 0.0.0.0:3000
   ```

### High Memory Usage

The container is optimized for production:
- Multi-stage build keeps image small
- Only production dependencies included
- Node.js 18 Alpine base image

To limit memory:

```yaml
# docker-compose.yml
services:
  flowbite-mcp:
    deploy:
      resources:
        limits:
          memory: 512M
```

Or with Docker CLI:

```bash
docker run -d \
  -p 3000:3000 \
  --memory="512m" \
  flowbite-mcp
```

## Production Best Practices

### 1. Use Docker Compose

Easier management and configuration:

```bash
docker-compose up -d    # Start
docker-compose restart  # Restart
docker-compose down     # Stop
```

### 2. Set Resource Limits

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
```

### 3. Use Health Checks

Already configured! The container automatically restarts if unhealthy.

### 4. Enable Logging

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### 5. Use a Reverse Proxy

Put nginx or Caddy in front for SSL and advanced features:

```nginx
server {
    listen 80;
    server_name mcp.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Monitor with Watchtower (Auto-Updates)

```yaml
services:
  flowbite-mcp:
    # ... your config ...

  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 3600  # Check every hour
```

## Updating the Container

### Pull Latest Code and Rebuild

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up -d --build
```

### Manual Update

```bash
# Stop the container
docker-compose down

# Remove old image
docker rmi flowbite-mcp

# Rebuild
docker-compose up -d --build
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Docker image
        run: docker build -t flowbite-mcp .
      
      - name: Test container
        run: |
          docker run -d --name test -p 3000:3000 flowbite-mcp
          sleep 5
          curl http://localhost:3000/health
          docker stop test
```

## Performance Tuning

### Image Size

Current image is optimized with:
- Alpine base (minimal size)
- Multi-stage build (no build tools in final image)
- Only production dependencies

### Startup Time

Typical startup time: **< 5 seconds**

### Memory Usage

Typical usage: **50-150 MB**

## Support

- 📖 [Main README](README.md)
- ⚙️ [Configuration Guide](CONFIGURATION.md)
- 🚀 [Quick Start](QUICK_START.md)
- 🐛 [Report Issues](https://github.com/themesberg/flowbite-mcp/issues)

## Summary

The Docker setup is now production-ready with:
- ✅ Multi-stage build for optimal image size
- ✅ Health checks for automatic recovery
- ✅ Proper dependency management
- ✅ Easy configuration via environment variables
- ✅ Docker Compose for simple management
- ✅ Production best practices included

**Start now:** `docker-compose up -d` 🚀

