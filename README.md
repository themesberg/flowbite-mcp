<p>
    <a href="https://flowbite.com" >
      <img alt="Flowbite - Tailwind CSS components" width="350" src="https://flowbite.s3.amazonaws.com/github/flowbite-mcp-github-2.png">
    </a><br>
    Official MCP server for Flowbite to leverage AI for UI creation and theme generation
</p>

<p>
    <a href="https://discord.com/invite/4eeurUVvTy"><img src="https://img.shields.io/discord/902911619032576090?color=%237289da&label=Discord" alt="Discord"></a>
    <a href="https://www.npmjs.com/package/flowbite-mcp"><img src="https://img.shields.io/npm/dt/flowbite-mcp.svg" alt="Total Downloads"></a>
    <a href="https://github.com/themesberg/flowbite-mcp/releases"><img src="https://img.shields.io/npm/v/flowbite-mcp.svg" alt="Latest Release"></a>
    <a href="https://flowbite.com/docs/getting-started/license/"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
</p>

An MCP server that enables AI assistants to access the [Flowbite](https://flowbite.com/) library of Tailwind CSS components—including UI elements, forms, typography, and plugins—while offering an intelligent theme generator for creating custom branded designs within AI-driven development environments.

## MCP Features

- **🎨 60+ UI Components** - Complete access to buttons, cards, modals, dropdowns, and more
- **📝 Form Elements** - Input fields, checkboxes, radio buttons, select, textarea, and advanced form components
- **✍️ Typography Components** - Headings, paragraphs, blockquotes, lists, and text styling
- **🔌 Plugin Integrations** - Charts, datatables, WYSIWYG editors, and datepickers
- **🎯 AI-Powered Theme Generator** - Create custom branded themes from any hex color
- **📦 Component Source Code** - Latest Flowbite Tailwind CSS implementations
- **📋 Metadata Access** - Component descriptions, usage patterns, and integration guides
- **🌐 Dual Transport Support** - Standard I/O (stdio) for CLI or Server-Sent Events (SSE) for HTTP
- **⚡ Production Ready** - Docker support with health checks and monitoring
- **🎨 Quickstart Guide** - Complete setup and integration documentation

## Quick Start

### Standard I/O Mode (stdio)

Perfect for local development and single-client usage:

```bash
# Run with stdio transport (default)
node build/index.js

# Or with npm
npm start

# Development mode with auto-reload
npm run dev
```

### Server-Sent Events Mode (SSE)

Ideal for production deployments and multiple concurrent clients:

```bash
# Run with SSE transport
node build/index.js --mode sse --port 3000

# With environment variables
MCP_TRANSPORT_MODE=sse MCP_PORT=3000 node build/index.js

# Production mode with Docker
docker-compose up -d
```

### Quick Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Transport Modes

### Standard I/O (stdio)

The default mode for local development and CLI integrations:

- **Use Case**: Claude Desktop, Cursor, VS Code extensions
- **Connection**: Direct process communication via stdin/stdout
- **Clients**: Single client per instance
- **Setup**: Simple, no network configuration needed

```bash
# Start in stdio mode (default)
node build/index.js

# Configure in Claude Desktop config.json
{
  "mcpServers": {
    "flowbite": {
      "command": "node",
      "args": ["/path/to/flowbite-mcp/build/index.js"]
    }
  }
}
```

### Server-Sent Events (SSE)

HTTP-based transport for production and multi-client scenarios:

- **Use Case**: Production servers, cloud deployments, multiple clients
- **Connection**: HTTP endpoints with SSE streaming
- **Clients**: Multiple concurrent connections
- **Setup**: Requires port configuration and network access

```bash
# Start SSE server
node build/index.js --mode sse --port 3000

# Connect with Claude Code or HTTP clients
curl http://localhost:3000/health
```

### Environment Variables

Configure the server behavior with these environment variables:

```bash
# Transport mode: stdio (default) or sse
MCP_TRANSPORT_MODE=sse

# Server port for SSE mode
MCP_PORT=3000

# Host binding for SSE mode
MCP_HOST=0.0.0.0

# CORS origins (comma-separated)
MCP_CORS_ORIGINS=http://localhost:3000,https://myapp.com
```

## Theme Generator Tool

The Flowbite MCP Server includes an AI-powered theme generator that creates custom Flowbite themes based on your brand color and natural language instructions.

### How It Works

1. **Provide a Brand Color** - Any hex color (e.g., `#FF5733`)
2. **Describe Your Vision** - Natural language instructions (e.g., "modern and minimalist")
3. **Get Custom Theme** - Complete CSS theme file with all variables customized

### Example Usage

```javascript
// Tool: generate-theme
{
  "brandColor": "#FF5733",
  "instructions": "Create a modern, minimalist design with soft rounded corners and subtle borders",
  "fileName": "my-brand-theme.css"
}
```

### What Gets Generated

- ✅ Complete color palette (50-950 shades) from your brand color
- ✅ AI-analyzed customizations for typography, spacing, and borders
- ✅ Both light and dark mode support
- ✅ All Tailwind CSS theme variables
- ✅ Ready-to-use CSS file with integration instructions

### Theme Customization Examples

**Modern & Minimalist:**
```
"Make it modern and minimalist with sharp edges and clean lines"
```

**Playful & Friendly:**
```
"Design for a children's app - playful, colorful, with rounded corners"
```

**Corporate & Professional:**
```
"Professional corporate style with subtle elegance and conservative styling"
```

**Luxury & Premium:**
```
"Create a luxury feel with elegant spacing and sophisticated aesthetics"
```

## 📚 Available Resources

The server provides access to comprehensive Flowbite documentation and components:

### Components (60+)
- **UI Components**: Accordion, Alerts, Avatar, Badge, Banner, Breadcrumb, Buttons, Button Group, Cards, Carousel, Chat Bubble, Clipboard, Datepicker, Device Mockups, Drawer, Dropdowns, Footer, Gallery, Indicators, Jumbotron, KBD, List Group, Mega Menu, Modal, Navbar, Pagination, Popover, Progress, QR Code, Rating, Sidebar, Skeleton, Speed Dial, Spinner, Stepper, Tables, Tabs, Timeline, Toast, Tooltips, Typography, Video

### Forms (13 Components)
- Checkbox, File Input, Floating Label, Input Field, Number Input, Phone Input, Radio, Range, Search Input, Select, Textarea, Timepicker, Toggle

### Typography (8 Components)
- Blockquote, Headings, Horizontal Rule, Images, Links, Lists, Paragraphs, Text

### Plugins (3 Integrations)
- Charts, Datatables, WYSIWYG Editor

### Additional Resources
- **Theme File**: Complete Tailwind CSS theme variable reference
- **Quickstart Guide**: Setup and integration documentation
- **Component List**: Table of contents with all available components

## Available Tools

### `generate-theme`

Generates a custom Flowbite theme CSS file based on brand color and design instructions.

**Parameters:**
- `brandColor` (required): Hex color code (e.g., `#3B82F6`)
- `instructions` (required): Natural language description of desired aesthetic
- `fileName` (optional): Output filename (default: `custom-theme.css`)

**Returns:**
- Complete CSS theme file with brand colors integrated
- Color palette breakdown (all generated shades)
- AI-analyzed customization suggestions
- Integration and usage instructions

### `convert-figma-to-code`

Converts Figma design layers to Flowbite component code.

**Parameters:**
- `figmaNodeUrl` (required): URL of the Figma node to convert

**Status:** In development

## Installation & Setup

### Prerequisites

- Node.js 16+ installed
- Tailwind CSS v4+ (for generated themes)

### Local Development

```bash
# Clone the repository
git clone https://github.com/themesberg/flowbite-mcp.git
cd flowbite-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run in stdio mode (for Claude Desktop, Cursor)
npm start

# Run in SSE mode (for production/multi-client)
MCP_TRANSPORT_MODE=sse npm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t flowbite-mcp .

# Run with Docker
docker run -p 3000:3000 -e MCP_TRANSPORT_MODE=sse flowbite-mcp

# Or use Docker Compose
docker-compose up -d

# Check health
curl http://localhost:3000/health
```

## 🔌 Integration Examples

### Claude Desktop (stdio)

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

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

### Cursor Editor (stdio)

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "flowbite": {
      "command": "node",
      "args": ["/absolute/path/to/flowbite-mcp/build/index.js"]
    }
  }
}
```

### HTTP Client (SSE)

Connect via HTTP when running in SSE mode:

```bash
# Start server in SSE mode
MCP_TRANSPORT_MODE=sse MCP_PORT=3000 npm start

# Health check
curl http://localhost:3000/health

# Connect with MCP client
# Use endpoint: http://localhost:3000/mcp
```

### Continue.dev

Configure in Continue settings:

```json
{
  "mcpServers": [
    {
      "name": "flowbite",
      "command": "node",
      "args": ["/absolute/path/to/flowbite-mcp/build/index.js"]
    }
  ]
}
```

## Use Cases

### For AI-Powered Development
- Build complete UIs with Flowbite components via AI assistants
- Generate custom-branded themes instantly
- Get component code with proper Tailwind CSS classes
- Access usage patterns and examples

### For Design Systems
- Create consistent themes across projects
- Generate color palettes from brand colors
- Maintain design system documentation
- Quick component reference lookup

### For Rapid Prototyping
- Get component implementations instantly
- Test different theme aesthetics
- Build forms and layouts quickly
- Access plugin integrations

### For Multi-Framework Projects
- Consistent Flowbite components across projects
- Shared theme generation tool
- Centralized component documentation
- Team collaboration via SSE mode

## Development Scripts

```bash
# Build TypeScript to JavaScript
npm run build

# Watch mode for development
npm run watch

# Development with auto-reload
npm run dev

# Run MCP Inspector for debugging
npm run inspector

# Start production server
npm start
```

## Docker Configuration

The project includes a production-ready Docker setup with multi-stage builds for optimal performance.

### Quick Start with Docker

```bash
# Build and run with Docker Compose (recommended)
docker-compose up -d

# Check health
curl http://localhost:3000/health

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Docker Features

- ✅ **Multi-stage build** - Smaller image size, faster deployment
- ✅ **Health checks** - Automatic container recovery
- ✅ **Production optimized** - Only production dependencies included
- ✅ **Easy configuration** - Environment variables for all settings

For complete Docker documentation, troubleshooting, and production best practices, see [DOCKER_GUIDE.md](DOCKER_GUIDE.md).

## Debugging & Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Check if port is already in use
lsof -i :3000

# Try a different port
MCP_PORT=3001 npm start
```

**Components not loading:**
```bash
# Verify data files exist
ls -la data/components/

# Rebuild the project
npm run build
```

**Theme generator errors:**
```bash
# Ensure valid hex color format
# ✅ Correct: #FF5733
# ❌ Wrong: FF5733, rgb(255,87,51)
```

### Debug Mode

Use the MCP Inspector for interactive debugging:

```bash
npm run inspector
```

### Logging

Check server logs for detailed information:

```bash
# stdio mode logs to console
node build/index.js

# SSE mode includes HTTP request logs
MCP_TRANSPORT_MODE=sse node build/index.js
```

## File structure

```
flowbite-mcp/
├── src/
│   ├── index.ts              # Main server entry point
│   └── server-runner.ts      # Express HTTP/SSE transport
├── data/
│   ├── components/           # 60+ component markdown files
│   ├── forms/                # Form component documentation
│   ├── typography/           # Typography elements
│   ├── plugins/              # Plugin documentation
│   ├── theme.md              # Theme variable reference
│   └── quickstart.md         # Getting started guide
├── build/                    # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License License - see the [LICENSE](LICENSE) file for details.

## Credits

- **[Flowbite](https://flowbite.com/)** - For the amazing Tailwind CSS component library
- **[Anthropic](https://anthropic.com)** - For the Model Context Protocol specification
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework

## Resources

### Documentation
- 📖 [Main Documentation](README.md) - This file
- 🚀 [Quick Start Guide](QUICK_START.md) - Get started in 5 minutes
- ⚙️ [Configuration Guide](CONFIGURATION.md) - All configuration options
- 🐳 [Docker Guide](DOCKER_GUIDE.md) - Docker deployment and troubleshooting
- 📝 [Changelog](CHANGELOG.md) - Version history and updates

### External Links
- 🎨 [Flowbite Documentation](https://flowbite.com/docs/getting-started/introduction/)
- 📦 [Flowbite Components](https://flowbite.com/docs/components/accordion/)
- 🌐 [Model Context Protocol](https://modelcontextprotocol.io/)
- 🚀 [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- 💬 [GitHub Issues](https://github.com/themesberg/flowbite-mcp/issues)

## Roadmap

- [x] Complete component resource access
- [x] AI-powered theme generator
- [x] Dual transport support (stdio + SSE)
- [ ] Flowbite Pro blocks integration (with license authentication)
- [ ] Figma to code conversion tool
- [ ] Enhanced theme customization options
- [ ] Component search and filtering
- [ ] Real-time component preview generation
