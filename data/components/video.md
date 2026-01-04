Get started with the video component to embed internal video source into a native HTML 5 video player and set custom options such as autoplay or muted to enhance the user experience.

## Video player

Use this example to create a native browser video player and apply the `w-full` utility class from Tailwind CSS to span the full width of the parent container.

```html
<video class="w-full rounded-base" controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

## Autoplay

Use the `autoplay` attribute on the video component to automatically start the video when the page has been loaded.

```html
<video class="w-full rounded-base" controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

## Muted

Use the `muted` attribute together with the `autoplay` option to start the video while the sound is muted.

```html
<video class="w-full rounded-base" autoplay muted controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

## Sizes

Set the width and height of the video component using the `w-{size}` and `h-{size}` utility classes from Tailwind CSS.

### Width

Use the `w-{size}` class to set the width of the video component.

```html
<video class="w-96 rounded-base" controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### Height

Use the `h-{size}` class to set the height of the video player.

```html
<video class="h-80 rounded-base" controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### Responsive

Use the following example to make the video responsive across all devices and viewports.

```html
<video class="w-full h-auto max-w-full rounded-base" controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

## Custom styles

Customize the video player appearance using the utility classes from Tailwind CSS such as `rounded-{size}` or `border` to set rounded-sm corners and border.

```html
<video class="w-full h-auto max-w-full border border-default rounded-base" controls>
  <source src="/docs/videos/flowbite.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```