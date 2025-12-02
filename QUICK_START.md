# Quick Start Guide

Get up and running with Flowbite MCP Server in 5 minutes!

## Installation

```bash
# Clone the repository
git clone https://github.com/themesberg/flowbite-mcp.git
cd flowbite-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Choose Your Mode

### Option 1: Standard I/O (stdio) - For Local Development

Perfect for Claude Desktop, Cursor, and VS Code integrations.

```bash
# Start the server
npm start

# The server is now ready to accept stdio connections
```

**Configure in Claude Desktop:**

1. Open: `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Add this configuration:

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

3. Restart Claude Desktop

### Option 2: Server-Sent Events (SSE) - For Production

Perfect for production deployments and multiple clients.

```bash
# Start SSE server on port 3000
npm run start:sse

# Or with custom port
node build/index.js --mode sse --port 8080
```

**Test the server:**

```bash
# Health check
curl http://localhost:3000/health

# Expected response:
# {"status":"ok","transport":"sse","timestamp":"..."}
```

## Test the Integration

Once your server is running and connected to an AI assistant, try these commands:

### 1. Browse Available Components

Ask your AI assistant:
```
"Show me what Flowbite components are available"
```

### 2. Get a Component

```
"Show me how to create a button using Flowbite"
"Give me the code for a modal component"
"How do I create a dropdown menu?"
```

### 3. Generate a Custom Theme

```
"Generate a Flowbite theme with brand color #FF5733 and make it modern and minimalist"

"Create a theme with color #3B82F6 for a professional corporate website"

"Generate a playful theme with #FF6B9D for a children's app"
```

## Example Usage

### Get Component Code

**You ask:**
```
"I need a button component from Flowbite"
```

**AI will:**
1. Access the Flowbite buttons resource
2. Show you various button styles and implementations
3. Provide the HTML/Tailwind CSS code

### Generate Custom Theme

**You ask:**
```
"Generate a Flowbite theme with my brand color #FF5733. 
Make it modern and minimalist with soft rounded corners."
```

**AI will:**
1. Use the `generate-theme` tool
2. Generate a complete color palette from your brand color
3. Create a customized CSS theme file
4. Provide integration instructions

**You get:**
- Complete CSS theme file
- Color palette (50-950 shades)
- Usage instructions
- Ready to copy and paste into your project

## Common Tasks

### View All Components

```
"List all available Flowbite components"
```

### Search for Specific Component

```
"Show me the modal component"
"How do I use the datepicker?"
"Give me examples of form inputs"
```

### Get Quickstart Guide

```
"How do I integrate Flowbite into my project?"
```

### Access Theme Variables

```
"Show me the Flowbite theme variables"
```

## Docker Quick Start

```bash
# Build and run with Docker
docker build -t flowbite-mcp .
docker run -p 3000:3000 flowbite-mcp

# Or use Docker Compose
docker-compose up -d

# Check health
curl http://localhost:3000/health
```

## Development Mode

For active development with auto-reload:

```bash
# Watch for changes and rebuild automatically
npm run dev
```

## Debugging

Use the MCP Inspector for interactive debugging:

```bash
npm run inspector
```

This opens an interactive interface where you can:
- Test server responses
- View available resources and tools
- Debug tool calls
- Inspect server logs

## Next Steps

1. **Read the Documentation**
   - [README.md](README.md) - Full documentation
   - [CONFIGURATION.md](CONFIGURATION.md) - Configuration options
   - [CHANGELOG.md](CHANGELOG.md) - Version history

2. **Explore Components**
   - Ask your AI about specific components
   - Try generating different themes
   - Experiment with customizations

3. **Integrate into Your Project**
   - Generate a custom theme for your brand
   - Copy component code into your project
   - Follow Flowbite installation guide from quickstart resource

## Troubleshooting

### Server won't start

```bash
# Check Node.js version (requires 18+)
node --version

# Rebuild the project
npm run build
```

### Port already in use (SSE mode)

```bash
# Use a different port
node build/index.js --mode sse --port 3001
```

### Can't connect from Claude Desktop

1. Check the absolute path in config is correct
2. Make sure server is running (`npm start`)
3. Restart Claude Desktop after config changes
4. Check logs for errors

### Theme generator not working

Make sure:
- Brand color is in hex format: `#FF5733` (not `FF5733`)
- Instructions are clear and descriptive
- Server has access to `data/theme.md` file

## Getting Help

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/themesberg/flowbite-mcp/issues)
- 💬 [Discussions](https://github.com/themesberg/flowbite-mcp/discussions)
- 🌐 [Flowbite Docs](https://flowbite.com/docs)

## What's Next?

Now that you have Flowbite MCP Server running:

1. ✅ Start building UIs with AI assistance
2. ✅ Generate custom themes for your projects
3. ✅ Explore all 60+ components
4. ✅ Share your creations with the community!

---

**Happy building with Flowbite! 🚀**

