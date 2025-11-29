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
      path: 'data/components/alerts.md',
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
  {
    name: 'flowbite_checkbox',
    uri: 'flowbite://forms/checkbox',
    title: 'Checkbox',
    path: 'data/forms/checkbox.md',
    description: 'Get started with the checkbox component to allow the user to select one or more options in the form of a square box available in multiple sizes and colors'
  },
  {
    name: 'flowbite_file_input',
    uri: 'flowbite://forms/file-input',
    title: 'File Input',
    path: 'data/forms/file-input.md',
    description: 'Get started with the file input component to allow the user to upload a file to the server'
  },
  {
    name: 'flowbite_floating_label',
    uri: 'flowbite://forms/floating-label',
    title: 'Floating Label',
    path: 'data/forms/floating-label.md',
    description: 'Get started with the floating label component to allow the user to input a value into a text field by clicking on the label and typing the value'
  },
  {
    name: 'flowbite_input_field',
    uri: 'flowbite://forms/input-field',
    title: 'Input Field',
    path: 'data/forms/input-field.md',
    description: 'Get started with the input field component to allow the user to input a value into a text field'
  },
  {
    name: 'flowbite_number_input',
    uri: 'flowbite://forms/number-input',
    title: 'Number Input',
    path: 'data/forms/number-input.md',
    description: 'Get started with the number input component to allow the user to input a number into a text field'
  },
  {
    name: 'flowbite_phone_input',
    uri: 'flowbite://forms/phone-input',
    title: 'Phone Input',
    path: 'data/forms/phone-input.md',
    description: 'Get started with the phone input component to allow the user to input a phone number into a text field'
  },
  {
    name: 'flowbite_radio',
    uri: 'flowbite://forms/radio',
    title: 'Radio',
    path: 'data/forms/radio.md',
    description: 'Get started with the radio component to allow the user to select one option from a list of options'
  },
  {
    name: 'flowbite_range_input',
    uri: 'flowbite://forms/range-input',
    title: 'Range Input',
    path: 'data/forms/range.md',
    description: 'Get started with the range input component to allow the user to input a range of values into a text field'
  },
  {
    name: 'flowbite_search_input',
    uri: 'flowbite://forms/search-input',
    title: 'Search Input',
    path: 'data/forms/search-input.md',
    description: 'Get started with the search input component to allow the user to input a search query into a text field'
  },
  {
    name: 'flowbite_select',
    uri: 'flowbite://forms/select',
    title: 'Select',
    path: 'data/forms/select.md',
    description: 'Get started with the select component to allow the user to select one option from a list of options'
  },
  {
    name: 'flowbite_textarea',
    uri: 'flowbite://forms/textarea',
    title: 'Textarea',
    path: 'data/forms/textarea.md',
    description: 'Get started with the textarea component to allow the user to input a value into a text field'
  },
  {
    name: 'flowbite_timepicker',
    uri: 'flowbite://forms/timepicker',
    title: 'Timepicker',
    path: 'data/forms/timepicker.md',
    description: 'Get started with the timepicker component to allow the user to input a time into a text field'
  },
  {
    name: 'flowbite_toggle',
    uri: 'flowbite://forms/toggle',
    title: 'Toggle',
    path: 'data/forms/toggle.md',
    description: 'Get started with the toggle component to allow the user to toggle a value on and off'
  },
  {
    name: 'flowbite_charts',
    uri: 'flowbite://plugins/charts',
    title: 'Charts',
    path: 'data/plugins/charts.md',
    description: 'Get started with the charts plugin to allow the user to create charts using the Chart.js library'
  },
  {
    name: 'flowbite_datatables',
    uri: 'flowbite://plugins/datatables',
    title: 'Datatables',
    path: 'data/plugins/datatables.md',
    description: 'Get started with the datatables plugin to allow the user to create tables using the DataTables library'
  },
  {
    name: 'flowbite_wysiwyg',
    uri: 'flowbite://plugins/wysiwyg',
    title: 'WYSIWYG',
    path: 'data/plugins/wysiwyg.md',
    description: 'Get started with the wysiwyg plugin to allow the user to create a rich text editor using the Quill library'
  },
  {
    name: 'flowbite_blockquote',
    uri: 'flowbite://typography/blockquote',
    title: 'Blockquote',
    path: 'data/typography/blockquote.md',
    description: 'Get started with the blockquote component to allow the user to create a blockquote using theblockquote element'
  },
  {
    name: 'flowbite_headings',
    uri: 'flowbite://typography/headings',
    title: 'Headings',
    path: 'data/typography/headings.md',
    description: 'Get started with the headings component to allow the user to create headings using the heading elements'
  },
  {
    name: 'flowbite_hr',
    uri: 'flowbite://typography/hr',
    title: 'HR',
    path: 'data/typography/hr.md',
    description: 'Get started with the hr component to allow the user to create a horizontal rule using the hr element'
  },
  {
    name: 'flowbite_images',
    uri: 'flowbite://typography/images',
    title: 'Images',
    path: 'data/typography/images.md',
    description: 'Get started with the images component to allow the user to create images using the img element'
  },
  {
    name: 'flowbite_links',
    uri: 'flowbite://typography/links',
    title: 'Links',
    path: 'data/typography/links.md',
    description: 'Get started with the links component to allow the user to create links using the a element'
  },
  {
    name: 'flowbite_lists',
    uri: 'flowbite://typography/lists',
    title: 'Lists',
    path: 'data/typography/lists.md',
    description: 'Get started with the lists component to allow the user to create lists using the ul and ol elements'
  },
  {
    name: 'flowbite_paragraphs',
    uri: 'flowbite://typography/paragraphs',
    title: 'Paragraphs',
    path: 'data/typography/paragraphs.md',
    description: 'Get started with the paragraphs component to allow the user to create paragraphs using the p element'
  },
  {
    name: 'flowbite_text',
    uri: 'flowbite://typography/text',
    title: 'Text',
    path: 'data/typography/text.md',
    description: 'Get started with the text component to allow the user to create text using the text element'
  }
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
