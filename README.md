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
- **🌐 Dual Transport Support** - Standard I/O (stdio) for CLI or HTTP Streamable for server deployments
- **⚡ Production Ready** - Docker support with health checks and monitoring
- **🎨 Quickstart Guide** - Complete setup and integration documentation

## Quickstart

### Using NPX

The simplest way to use Flowbite MCP Server:

```bash
# Run directly with npx (no installation needed)
npx flowbite-mcp

# Show help and options
npx flowbite-mcp --help

# Run in HTTP server mode for production
npx flowbite-mcp --mode http --port 3000
```

## Transport Modes

### Standard I/O (stdio)

The default mode for local development and CLI integrations:

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

### HTTP server

HTTP-based transport for production and multi-client scenarios:

```bash
node build/index.js --mode http --port 3000
```

This will make the MCP server available at 'http://localhost:3000/mcp'.

### Environment variables

Configure the server behavior with these environment variables:

```bash
# Transport mode: stdio (default) or http
MCP_TRANSPORT_MODE=http

# Server port for HTTP mode
MCP_PORT=3000

# Host binding for HTTP mode
MCP_HOST=0.0.0.0

# CORS origins (comma-separated)
MCP_CORS_ORIGINS=http://localhost:3000,https://myapp.com
```

## Integration examples

<a href="https://glama.ai/mcp/servers/@zoltanszogyenyi/flowbite-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@zoltanszogyenyi/flowbite-mcp/badge" />
</a>

### Claude desktop

Update the `claude_desktop_config.json` file and add the following configuration:

```json
{
  "mcpServers": {
    "flowbite": {
      "command": "npx",
      "args": ["-y", "flowbite-mcp"]
    }
  }
}
```

### Cursor editor

Update the `mcp.json` file and add the following configuration:

```json
{
  "mcpServers": {
    "flowbite": {
      "command": "npx",
      "args": ["-y", "flowbite-mcp"]
    }
  }
}
```

### Windsurf editor

Update the `mcp_config.json` file and add the following configuration:

```json
{
  "mcpServers": {
    "flowbite": {
      "command": "npx",
      "args": ["-y", "flowbite-mcp"]
    }
  }
}
```

### Local development

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

# Run inspector
npm run start inspector

# Run in HTTP server mode (for production/multi-client)
MCP_TRANSPORT_MODE=http npm start
```

### Production deployment (HTTP Mode)

For production servers with multiple clients:

```bash
# Using npx
npx flowbite-mcp --mode http --port 3000

# Using Docker Compose
docker-compose up -d

# Health check
curl http://localhost:3000/health
```

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

### Quickstart with Docker

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

### MCP inspector

Use the MCP Inspector for interactive debugging:

```bash
npm run inspector
```

### Logging

Check server logs for detailed information:

```bash
# stdio mode logs to console
node build/index.js

# HTTP mode includes HTTP request logs
MCP_TRANSPORT_MODE=http node build/index.js
```

## File structure

```
flowbite-mcp/
├── src/
│   ├── index.ts              # Main server entry point
│   └── server-runner.ts      # Express HTTP Streamable transport
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

- 🎨 [Flowbite Documentation](https://flowbite.com/docs/getting-started/introduction/)
- 📦 [Flowbite Components](https://flowbite.com/docs/components/accordion/)
- 🌐 [Model Context Protocol](https://modelcontextprotocol.io/)
- 🚀 [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- 💬 [GitHub Issues](https://github.com/themesberg/flowbite-mcp/issues)

## Roadmap

- [x] Complete component resource access
- [x] AI-powered theme generator
- [x] Dual transport support (stdio + HTTP)
- [ ] Flowbite Pro blocks integration (with license authentication)
- [ ] Figma to code conversion tool
- [ ] Enhanced theme customization options
- [ ] Component search and filtering
- [ ] Real-time component preview generation
