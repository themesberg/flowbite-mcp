## Getting started

Flowbite can be easily integrated into your project through NPM. It functions as a plugin for Tailwind CSS and offers both a data attributes interface and a JavaScript API for powering interactive UI components.

### Install using NPM

Make sure that you have <a href="https://nodejs.org/en/" rel="nofollow" target="_blank">Node.js</a> and <a href="https://tailwindcss.com/docs/installation/using-postcss" rel="nofollow" target="_blank">Tailwind CSS</a> installed. This guide works with Tailwind v4.

1. Install Flowbite as a dependency using NPM by running the following command:

{{< code lang="bash" >}}
npm install flowbite
{{< /code >}}

2. Import the default theme variables from Flowbite inside your main `input.css` CSS file:

{{< code lang="css" icon="file" file="input.css" >}}
/* choose one of the following */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import "flowbite/src/themes/default";

/* MINIMAL THEME
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
@import "flowbite/src/themes/minimal";
*/

/* ENTERPRISE THEME
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap');
@import "flowbite/src/themes/enterprise";
*/

/* PLAYFUL THEME
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap');
@import "flowbite/src/themes/playful";
*/

/* MONO THEME
@import "flowbite/src/themes/mono";
*/
{{< /code >}}

3. Import the Flowbite plugin file in your CSS:

{{< code lang="css" icon="file" file="input.css" >}}
@plugin "flowbite/plugin";
{{< /code >}}

4. Configure the source files of Flowbite in your CSS:

{{< code lang="css" icon="file" file="input.css" >}}
@source "../node_modules/flowbite";
{{< /code >}}

5. Include the JavaScript code that powers the interactive elements before the end of your `<body>` tag:

{{< code lang="html" icon="file" file="index.html" >}}
<script src="../path/to/flowbite/dist/flowbite.min.js"></script>
{{< /code >}}

Learn more about the Flowbite JavaScript API and functionalities in the [JavaScript section](https://flowbite.com/docs/getting-started/javascript/).

If you have and old project with Tailwind CSS v3 then [check out this guide](#tailwind-css-v3-to-v4) to learn how to upgrade to v4.

### Include using CDN

The quickest way to get started working with Flowbite is to include the CSS and JS into your project via CDN.

Require the following minified stylesheet inside the `head` tag:

{{< code lang="html" icon="file" file="index.html" >}}
<link href="https://cdn.jsdelivr.net/npm/flowbite@{{< current_version >}}/dist/flowbite.min.css" rel="stylesheet" />
{{< /code >}}

And include the following JavaScript file before the end of the `body` element:

{{< code lang="html" icon="file" file="index.html" >}}
<script src="https://cdn.jsdelivr.net/npm/flowbite@{{< current_version >}}/dist/flowbite.min.js"></script>
{{< /code >}}

Please remember that the best way to work with Tailwind CSS and Flowbite is by purging the CSS classes.

### Bundled JavaScript

One of the most popular way of using Flowbite is to include the bundled Javascript file which is UMD ready using a bundler such as Webpack or Parcel which makes sure that all of the data attributes and functionality will work out-of-the-box.

You can directly import the main JavaScript file inside your bundled `app-bundle.js` file like this:

{{< code lang="javascript" icon="file" file="app.js" >}}
import 'flowbite';
{{< /code >}}

This file has access to all of the components and it automatically applies event listeners to the data attributes.

### Data attributes

The preferred way to use the interactive UI components from Flowbite is via the data attributes interface which allows us to add functionality via the HTML element attributes and most of the examples on our documentation applies this strategy.

For example, to set up a modal component all you need to do is use `data-modal-target` and `data-modal-{toggle|show|hide}` to toggle, show, or hide the component by clicking on any trigger element.

### Init functions

You can also use the init functions to set up the event listeners yourself. Here's an example how you can do it with Vue or Nuxt:

{{< code lang="javascript" icon="file" file="app.js" >}}
<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    // Modal HTML markup with data attributes from Flowbite
</template>
{{< /code >}}

The `initFlowbite` function sets up all of the init functions for dropdowns, modals, navbars, tooltips and so on to hook onto the data attributes. Alternatively, you can also initialise each component category class separately with `initDropdowns` or `initModals`.

You can view more examples by browsing the [components from Flowbite](#components).

### ESM and CJS

Flowbite also offers an API for using the components programmatically and it supports both CJS and ESM for JavaScript which can be helpful if you need to expand the default capabilities of the data attributes interface and get access to function callbacks.

Here's an example how you can import and create a new Modal component inside JavaScript:

{{< code lang="javascript" icon="file" file="app.js" >}}
import { Modal } from 'flowbite'

const $modalElement = document.querySelector('#modalEl');

const modalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    }
}

const modal = new Modal($modalElement, modalOptions);

modal.show();
{{< /code >}}

Check out the JavaScript behaviour section of each component's page to learn how you can use this.

### TypeScript

Flowbite supports type declarations for the interactive UI components including object interfaces and parameter types. Check out the following examples to learn how you can use types with Flowbite.

Additionally to our code above, we will now import some relevant types from the Flowbite package, namely the `ModalOptions` and `ModalInterface`:

{{< code lang="javascript" icon="file" file="app.ts" >}}
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

// other code
{{< /code >}}