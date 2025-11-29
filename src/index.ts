import { z } from 'zod';
import { isInitializeRequest, CallToolResult } from "@modelcontextprotocol/sdk/types.js"
import { ExpressHttpStreamableMcpServer } from "./server-runner.js";
import { readFileSync } from 'fs';
import { join } from 'path';

const PORT = process.env.PORT || 3000;

console.log("Initializing MCP Streamable-HTTP Server with Express")

const COMPONENT_FILES = [
    {
      name: 'flowbite_accordion',
      uri: 'flowbite://components/accordion',
      title: 'Accordion',
      path: 'data/components/accordion.md',
      description: 'Use the accordion component to show hidden information based on the collapse and expand state of the child elements using data attribute options'
    },
    {
      name: 'flowbite_alert',
      uri: 'flowbite://components/alert',
      title: 'Alert',
      path: 'data/components/alert.md',
      description: 'Show contextual information to your users using alert elements based on Tailwind CSS'
    },
    {
      name: 'flowbite_avatar',
      uri: 'flowbite://components/avatar',
      title: 'Avatar',
      path: 'data/components/avatar.md',
      description: 'Use the avatar component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_badge',
      uri: 'flowbite://components/badge',
      title: 'Badge',
      path: 'data/components/badge.md',
      description: 'Use the badge component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_banner',
      uri: 'flowbite://components/banner',
      title: 'Banner',
      path: 'data/components/banner.md',
      description: 'Use the banner component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_bottom_navigation',
      uri: 'flowbite://components/bottom-navigation',
      title: 'Bottom Navigation',
      path: 'data/components/bottom-navigation.md',
      description: 'Use the bottom navigation component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_breadcrumb',
      uri: 'flowbite://components/breadcrumb',
      title: 'Breadcrumb',
      path: 'data/components/breadcrumb.md',
      description: 'Use the breadcrumb component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_buttons',
      uri: 'flowbite://components/buttons',
      title: 'Buttons',
      path: 'data/components/buttons.md',
      description: 'Use the buttons component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_button_group',
      uri: 'flowbite://components/button-group',
      title: 'Button Group',
      path: 'data/components/button-group.md',
      description: 'Use the button group component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_cards',
      uri: 'flowbite://components/cards',
      title: 'Cards',
      path: 'data/components/card.md',
      description: 'Use the cards component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_carousel',
      uri: 'flowbite://components/carousel',
      title: 'Carousel',
      path: 'data/components/carousel.md',
      description: 'Use the carousel component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_chat_bubble',
      uri: 'flowbite://components/chat-bubble',
      title: 'Chat Bubble',
      path: 'data/components/chat-bubble.md',
      description: 'Use the chat bubble component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_clipboard',
      uri: 'flowbite://components/clipboard',
      title: 'Clipboard',
      path: 'data/components/clipboard.md',
      description: 'Use the clipboard component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_datepicker',
      uri: 'flowbite://components/datepicker',
      title: 'Datepicker',
      path: 'data/components/datepicker.md',
      description: 'Use the datepicker component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_device_mockups',
      uri: 'flowbite://components/device-mockups',
      title: 'Device Mockups',
      path: 'data/components/device-mockups.md',
      description: 'Use the device mockups component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_drawer',
      uri: 'flowbite://components/drawer',
      title: 'Drawer',
      path: 'data/components/drawer.md',
      description: 'Use the drawer component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_dropdowns',
      uri: 'flowbite://components/dropdowns',
      title: 'Dropdowns',
      path: 'data/components/dropdowns.md',
      description: 'Use the dropdowns component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_footer',
      uri: 'flowbite://components/footer',
      title: 'Footer',
      path: 'data/components/footer.md',
      description: 'Use the footer component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_forms',
      uri: 'flowbite://components/forms',
      title: 'Forms',
      path: 'data/components/forms.md',
      description: 'Use the forms component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_gallery',
      uri: 'flowbite://components/gallery',
      title: 'Gallery',
      path: 'data/components/gallery.md',
      description: 'Use the gallery component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_indicators',
      uri: 'flowbite://components/indicators',
      title: 'Indicators',
      path: 'data/components/indicators.md',
      description: 'Use the indicators component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_jumbotron',
      uri: 'flowbite://components/jumbotron',
      title: 'Jumbotron',
      path: 'data/components/jumbotron.md',
      description: 'Use the jumbotron component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_kbd',
      uri: 'flowbite://components/kbd',
      title: 'KBD',
      path: 'data/components/kbd.md',
      description: 'Use the kbd component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_list_group',
      uri: 'flowbite://components/list-group',
      title: 'List Group',
      path: 'data/components/list-group.md',
      description: 'Use the list group component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_mega_menu',
      uri: 'flowbite://components/mega-menu',
      title: 'Mega Menu',
      path: 'data/components/mega-menu.md',
      description: 'Use the mega menu component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_modal',
      uri: 'flowbite://components/modal',
      title: 'Modal',
      path: 'data/components/modal.md',
      description: 'Use the modal component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_navbar',
      uri: 'flowbite://components/navbar',
      title: 'Navbar',
      path: 'data/components/navbar.md',
      description: 'Use the navbar component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_pagination',
      uri: 'flowbite://components/pagination',
      title: 'Pagination',
      path: 'data/components/pagination.md',
      description: 'Use the pagination component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_popover',
      uri: 'flowbite://components/popover',
      title: 'Popover',
      path: 'data/components/popover.md',
      description: 'Use the popover component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_progress',
      uri: 'flowbite://components/progress',
      title: 'Progress',
      path: 'data/components/progress.md',
      description: 'Use the progress component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
    {
      name: 'flowbite_qr_code',
      uri: 'flowbite://components/qr-code',
      title: 'QR Code',
      path: 'data/components/qr-code.md',
      description: 'Use this component to generate and show QR codes based on text or URL that can be scanned with device phone cameras and other devices using the Flowbite library based on Tailwind CSS'
    },
    {
      name: 'flowbite_rating',
      uri: 'flowbite://components/rating',
      title: 'Rating',
      path: 'data/components/rating.md',
      description: 'Use the rating component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
    },
  {
    name: 'flowbite_sidebar',
    uri: 'flowbite://components/sidebar',
    title: 'Sidebar',
    path: 'data/components/sidebar.md',
    description: 'Use the sidebar component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_skeleton',
    uri: 'flowbite://components/skeleton',
    title: 'Skeleton',
    path: 'data/components/skeleton.md',
    description: 'Use the skeleton component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_speed_dial',
    uri: 'flowbite://components/speed-dial',
    title: 'Speed Dial',
    path: 'data/components/speed-dial.md',
    description: 'Use the speed dial component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_spinner',
    uri: 'flowbite://components/spinner',
    title: 'Spinner',
    path: 'data/components/spinner.md',
    description: 'Use the spinner component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_stepper',
    uri: 'flowbite://components/stepper',
    title: 'Stepper',
    path: 'data/components/stepper.md',
    description: 'Use the stepper component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_tables',
    uri: 'flowbite://components/tables',
    title: 'Tables',
    path: 'data/components/tables.md',
    description: 'Use the tables component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_tabs',
    uri: 'flowbite://components/tabs',
    title: 'Tabs',
    path: 'data/components/tabs.md',
    description: 'Use the tabs component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_timeline',
    uri: 'flowbite://components/timeline',
    title: 'Timeline',
    path: 'data/components/timeline.md',
    description: 'Use the timeline component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_toast',
    uri: 'flowbite://components/toast',
    title: 'Toast',
    path: 'data/components/toast.md',
    description: 'Use the toast component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_tooltips',
    uri: 'flowbite://components/tooltips',
    title: 'Tooltips',
    path: 'data/components/tooltips.md',
    description: 'Use the following Tailwind CSS powered tooltips to show extra content when hovering or focusing on an element'
  },
  {
    name: 'flowbite_typography',
    uri: 'flowbite://components/typography',
    title: 'Typography',
    path: 'data/components/typography.md',
    description: 'Use the typography component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
  {
    name: 'flowbite_video',
    uri: 'flowbite://components/video',
    title: 'Video',
    path: 'data/components/video.md',
    description: 'Use the video component to show a visual representation of a user profile using an image element or SVG object based on multiple styles and sizes'
  },
]

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
        const componentsContent = readFileSync(join(process.cwd(), "data/toc.md"), "utf-8");
        
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

    COMPONENT_FILES.forEach(
      (component) => {
        server.resource(component.name, component.uri, async (uri) => {
          const componentContent = readFileSync(join(process.cwd(), component.path), "utf-8");
          return {
            contents: [
              {
                uri: uri.href,
                text: componentContent,
                mimeType: "text/markdown",
              },
            ],
          };
        });
      }
    )

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

});
