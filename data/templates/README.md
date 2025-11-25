# Theme Templates

This directory contains templates that can be used by AI assistants via the MCP server.

## Available Templates

### `theme.css`

Complete Flowbite theme template with CSS custom properties including:
- **Typography**: Font families, sizes, line heights, letter spacing
- **Spacing**: Comprehensive spacing scale
- **Border Radius**: Various border radius options
- **Colors**: 
  - Text colors (body, headings, brand, status colors)
  - Background colors (neutral, brand, status colors)
  - Border colors
- **Dark Mode**: Complete dark mode color overrides

## Usage in MCP

The template is exposed as a **Resource** at `template://theme` and can be:

1. **Read directly by AI** via the resource URI
2. **Referenced in the `create-theme-file` tool** which embeds the template in instructions

### Example Usage

```
User: "Create a theme file that looks like the Lego website"

AI will:
1. Read the template://theme resource
2. Use the create-theme-file tool with brandDescription="Lego website"
3. Generate a new theme.css based on the template structure with Lego-inspired colors
```

## Adding New Templates

To add new templates:

1. Create a new `.css` or `.json` file in this directory
2. Register it as a resource in `src/server.ts`:

```typescript
server.resource(
  "template://your-template-name",
  "Description of your template",
  async () => {
    const templatePath = join(process.cwd(), "data/templates/your-template.css");
    const content = readFileSync(templatePath, "utf-8");
    return {
      contents: [{ uri: "template://your-template-name", mimeType: "text/css", text: content }]
    };
  }
);
```

3. Update tool descriptions to reference the new template

