# Configuration Guide

This guide covers all configuration options for the Flowbite MCP Server.

## Transport Modes

The server supports two transport modes:

### stdio (Standard I/O)

**Best for:**
- Local development
- Claude Desktop integration
- Cursor editor integration
- VS Code extensions
- Single-client usage

**How to use:**
```bash
# Default mode (no flags needed)
node build/index.js

# Explicitly set stdio mode
node build/index.js --mode stdio

# Or with environment variable
MCP_TRANSPORT_MODE=stdio node build/index.js
```

**Configuration example for Claude Desktop:**
```json
{
  "mcpServers": {
    "flowbite": {
      "command": "node",
      "args": ["/absolute/path/to/flowbite-mcp/build/index.js"],
      "env": {
        "MCP_TRANSPORT_MODE": "stdio"
      }
    }
  }
}
```

### http (HTTP Streamable Mode)

**Best for:**
- Production deployments
- Multi-client scenarios
- Cloud hosting
- Docker deployments
- HTTP-based integrations

**How to use:**
```bash
# Start http server on port 3000
node build/index.js --mode http --port 3000

# Or with environment variables
MCP_TRANSPORT_MODE=http MCP_PORT=3000 node build/index.js

# Or use npm script
npm run start:http
```

**Configuration example:**
```bash
# .env file
MCP_TRANSPORT_MODE=http
MCP_PORT=3000
MCP_HOST=0.0.0.0
MCP_CORS_ORIGINS=http://localhost:3000,https://myapp.com
```

## Environment Variables

### MCP_TRANSPORT_MODE

- **Type:** String
- **Values:** `stdio` | `http`
- **Default:** `stdio`
- **Description:** Transport mode for the MCP server

```bash
MCP_TRANSPORT_MODE=http
```

### MCP_PORT

- **Type:** Number
- **Default:** `3000`
- **Description:** Port number for HTTP mode (ignored in stdio mode)

```bash
MCP_PORT=3000
```

### MCP_HOST

- **Type:** String
- **Default:** `0.0.0.0`
- **Description:** Host binding for HTTP mode (ignored in stdio mode)

```bash
MCP_HOST=127.0.0.1  # Localhost only
MCP_HOST=0.0.0.0    # All interfaces
```

### MCP_CORS_ORIGINS

- **Type:** String (comma-separated)
- **Default:** `*`
- **Description:** Allowed CORS origins for HTTP mode

```bash
MCP_CORS_ORIGINS=*  # Allow all (development only)
MCP_CORS_ORIGINS=http://localhost:3000,https://myapp.com  # Production
```

### NODE_ENV

- **Type:** String
- **Values:** `development` | `production`
- **Default:** `development`
- **Description:** Node.js environment mode

```bash
NODE_ENV=production
```

## Command-Line Arguments

### --mode

Specifies the transport mode:

```bash
node build/index.js --mode stdio
node build/index.js --mode http
```

### --port

Specifies the port for HTTP mode:

```bash
node build/index.js --mode http --port 3000
node build/index.js --mode http --port 8080
```

## npm Scripts

The `package.json` includes convenient scripts:

```bash
# Build the project
npm run build

# Start in default mode (stdio)
npm start

# Start in HTTP mode
npm run start:http

# Start in stdio mode explicitly
npm run start:stdio

# Development mode with auto-reload
npm run dev

# Watch TypeScript changes
npm run watch

# Run MCP Inspector
npm run inspector

# Docker commands
npm run docker:build
npm run docker:run
npm run docker:up
npm run docker:down
```

## Docker Configuration

### Using docker run

```bash
# Basic usage (HTTP mode, port 3000)
docker run -p 3000:3000 flowbite-mcp

# Custom port
docker run -p 8080:3000 -e MCP_PORT=3000 flowbite-mcp

# With CORS configuration
docker run -p 3000:3000 \
  -e MCP_CORS_ORIGINS=https://myapp.com \
  flowbite-mcp
```

### Using docker-compose

Create a `.env` file:

```bash
MCP_PORT=3000
MCP_CORS_ORIGINS=*
```

Run with Docker Compose:

```bash
docker-compose up -d
```

### Health Checks

The HTTP mode includes health check endpoints:

```bash
# Check server health
curl http://localhost:3000/health

# Expected response
{"status":"ok","transport":"http","timestamp":"..."}
```

## Editor Integrations

### Claude Desktop

**Location:** `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

```json
{
  "mcpServers": {
    "flowbite": {
      "command": "node",
      "args": ["/Users/username/flowbite-mcp/build/index.js"],
      "env": {
        "MCP_TRANSPORT_MODE": "stdio"
      }
    }
  }
}
```

### Cursor

**Location:** Cursor Settings → MCP Servers

```json
{
  "mcpServers": {
    "flowbite": {
      "command": "node",
      "args": ["/Users/username/flowbite-mcp/build/index.js"]
    }
  }
}
```

### VS Code with Continue.dev

**Location:** `.continue/config.json`

```json
{
  "mcpServers": [
    {
      "name": "flowbite",
      "command": "node",
      "args": ["/Users/username/flowbite-mcp/build/index.js"]
    }
  ]
}
```

## Production Deployment

### Recommended Configuration

```bash
# .env file for production
MCP_TRANSPORT_MODE=http
MCP_PORT=3000
MCP_HOST=0.0.0.0
MCP_CORS_ORIGINS=https://yourdomain.com
NODE_ENV=production
```

### With Process Manager (PM2)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start build/index.js --name flowbite-mcp -- --mode http --port 3000

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

### With systemd

Create `/etc/systemd/system/flowbite-mcp.service`:

```ini
[Unit]
Description=Flowbite MCP Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/flowbite-mcp
Environment="MCP_TRANSPORT_MODE=http"
Environment="MCP_PORT=3000"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/node build/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable flowbite-mcp
sudo systemctl start flowbite-mcp
sudo systemctl status flowbite-mcp
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000

# Use a different port
node build/index.js --mode http --port 3001
```

### Permission Denied (build/index.js)

```bash
# Make executable
chmod +x build/index.js

# Or rebuild
npm run build
```

### CORS Errors

Configure CORS origins properly:

```bash
MCP_CORS_ORIGINS=http://localhost:3000,https://yourapp.com npm run start:http
```

### Connection Refused

Make sure the server is running and the port is correct:

```bash
# Check server is running
curl http://localhost:3000/health

# Check with verbose output
curl -v http://localhost:3000/health
```

## Advanced Configuration

### Custom Data Directory

Mount a custom data directory with Docker:

```bash
docker run -p 3000:3000 \
  -v /path/to/custom/data:/app/data:ro \
  flowbite-mcp
```

### Logging

Configure logging with environment variables:

```bash
# Enable debug logging
DEBUG=* node build/index.js

# Or with a log file
node build/index.js 2>&1 | tee flowbite-mcp.log
```

### Security Headers

For production, consider using a reverse proxy (nginx, Caddy) with proper security headers:

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
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

## Getting Help

- 📖 Check the [README](README.md)
- 🐛 Report issues on [GitHub](https://github.com/themesberg/flowbite-mcp/issues)
- 💬 Join discussions on [GitHub Discussions](https://github.com/themesberg/flowbite-mcp/discussions)

