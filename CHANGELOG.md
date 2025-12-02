# Changelog

All notable changes to the Flowbite MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-02

### Added
- Initial release of Flowbite MCP Server
- Support for 60+ Flowbite UI components as resources
- Support for 13 form components (checkbox, input, select, textarea, etc.)
- Support for 8 typography components (headings, paragraphs, lists, etc.)
- Support for 3 plugin integrations (charts, datatables, WYSIWYG)
- AI-powered theme generator tool with intelligent color palette generation
- Dual transport mode support (stdio and HTTP)
- Complete Flowbite theme resource with all CSS variables
- Quickstart guide resource for integration
- Docker and Docker Compose support for production deployments
- Health check endpoints for HTTP mode
- Command-line arguments for transport mode and port configuration
- Environment variable support for configuration
- TypeScript implementation with full type safety
- MCP Inspector support for debugging
- Development mode with auto-reload

### Features

#### Resources
- `flowbite_theme` - Complete Tailwind CSS theme variable reference
- `flowbite_quickstart` - Getting started and integration guide
- `flowbite_components` - Table of contents for all components
- 60+ individual component resources with full documentation

#### Tools
- `generate-theme` - AI-powered theme generator
  - Accepts brand color in hex format
  - Natural language instructions for customization
  - Generates complete color palette (50-950 shades)
  - Returns customizable CSS theme file
  - Supports both light and dark mode
- `convert-figma-to-code` - Figma to code conversion (in development)
- `get_session` - Session management tool

#### Transport Modes
- **stdio** - Standard I/O for local development and CLI tools
- **http** - HTTP Streamable transport for production and multi-client deployments

### Technical Details
- Built with TypeScript 5.9+
- Uses MCP SDK 1.22+
- Express.js for HTTP Streamable transport
- Zod for runtime type validation
- Node.js 18+ required

### Documentation
- Comprehensive README with quick start guide
- Docker deployment instructions
- Integration examples for Claude Desktop, Cursor, VS Code
- Environment variable configuration guide
- Troubleshooting section
- Architecture overview

## [Unreleased]

### Planned Features
- Flowbite Pro blocks integration with license authentication
- Enhanced Figma to code conversion tool
- Component search and filtering capabilities
- Real-time component preview generation
- Advanced theme customization options
- CLI tool for theme generation
- Web-based theme customizer
- Component dependency analyzer
- Code snippet generator with multiple framework support

### Under Consideration
- Vue.js and Svelte component documentation
- React Native implementation guide
- Component testing utilities
- Performance optimization recommendations
- Accessibility checking tools
- Design system validation

