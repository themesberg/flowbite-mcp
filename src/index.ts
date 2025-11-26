import { z } from 'zod';
import { isInitializeRequest, CallToolResult } from "@modelcontextprotocol/sdk/types.js"
import { ExpressHttpStreamableMcpServer } from "./server-runner.js";
import { readFileSync } from 'fs';
import { join } from 'path';

const COMPONENT_CATEGORIES = [
  'https://flowbite.com/docs/components/accordion/',
  'Alerts',
  'Avatar',
  'Badge',
  'Banner',
  'Bottom Navigation',
  'Breadcrumb,'
]

const PORT = process.env.PORT || 3000;

console.log("Initializing MCP Streamable-HTTP Server with Express")

const servers = ExpressHttpStreamableMcpServer(
  {
    name: "flowbite-pro-mcp",
  },
  server => {

    // TODO tools, resources
    // create resources for all components like buttons, cards, forms, etc. (show code, image screenshot, link to docs, link to figma)
    // generate theme file (prompt for brand color)
    // pro: create resources for blocks when authenticated with license key + subscription to mcp server
    // pro: convert figma layers to code blocks when subscription to mcp server

    server.resource(
      "flowbite_components",
      "flowbite://components/all",
      {
        description: "A list of all Flowbite UI components with links to documentation",
        title: "Flowbite Components",
        mimeType: "text/markdown",
      },
      async (uri) => {
        const componentsContent = readFileSync(join(process.cwd(), "data/components.md"), "utf-8");
        
        return {
          contents: [
            {
              uri: uri.href,
              text: componentsContent,
              mimeType: "text/markdown",
            },
          ],
        };
      }
    );

    server.tool(
      'convert-figma-to-code',
      'Converts a Figma layer to a code block',
      {
        figmaNodeUrl: z.string().describe('The URL of the Figma node to convert'),
      },
      async ({ figmaNodeUrl }): Promise<CallToolResult> => {
        try {
          return {
            content: [
              {
                type: 'text',
                text: `Code block converted`,
              },
            ],
          };
        } catch (error) {
          console.error(`Error converting Figma node to code: ${error}`);
          return {
            content: [
              {
                type: 'text',
                text: `Error converting Figma node to code: ${error}`,
              },
            ],
          }
        }
      }
    );

    // ... set up server resources, tools, and prompts ...
    server.tool(
      'greet',
      'A simple greeting tool',
      {
        name: z.string().describe('Name to greet'),
      },
      async ({ name }): Promise<CallToolResult> => {
        console.log(`Tool Called: greet (name=${name})`);
        return {
          content: [
            {
              type: 'text',
              text: `Hello, ${name}!`,
            },
          ],
        };
      }
    );

    server.tool(
      'get_session',
      'gets the session id and context',
      {},
      async ({}): Promise<CallToolResult> => {
        return {
          content: [
            {
              type: 'text',
              text: `session`,
            },
          ],
        };
      }
    );

    // Register a tool that sends multiple greetings with notifications
    server.tool(
      'multi-greet',
      'A tool that sends different greetings with delays between them',
      {
        name: z.string().describe('Name to greet'),
      },
      async ({ name }, { sendNotification }): Promise<CallToolResult> => {
        console.log(`Tool Called: multi-greet (name=${name})`);
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await sendNotification({
          method: "notifications/message",
          params: { level: "debug", data: `Starting multi-greet for ${name}` }
        });

        await sleep(1000); // Wait 1 second before first greeting

        await sendNotification({
          method: "notifications/message",
          params: { level: "info", data: `Sending first greeting to ${name}` }
        });

        await sleep(1000); // Wait another second before second greeting

        await sendNotification({
          method: "notifications/message",
          params: { level: "info", data: `Sending second greeting to ${name}` }
        });

        return {
          content: [
            {
              type: 'text',
              text: `Good morning, ${name}!`,
            }
          ],
        };
      }
    );
});
