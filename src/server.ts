import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "flowbite-pro-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
});

server.tool("create-theme-file", "Creates a CSS theme file based on the Flowbite variables", async () => {
  try {
    return {
      content: [
        {
          type: "text",
          text: "Theme file created successfully",
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to create theme file",
        }
      ]
    };
  }
})

server.tool(
  "convert-figma-to-code",
  "Converts a Figma file to a Flowbite Code snippet",
  {
    figmaNodeUrl: z.string().describe("The Figma node URL to convert"),
  },
  async ({ figmaNodeUrl }) => {
    try {
      return {
        content: [
          {
            type: "text",
            text: "Figma to Code converted successfully",
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to convert Figma to Code",
          }
        ]
      };
    }
  }
)

async function main () {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();