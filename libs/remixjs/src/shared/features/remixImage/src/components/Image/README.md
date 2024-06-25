# Overview

The `Image` component renders an image element with responsive attributes based on the provided configuration. It offers features such as resizing images for faster loading, converting to efficient file types, and applying transformations like resizing, cropping, rotating, blurring, and flipping.

# Props

| Prop                | Type                                                                | Optional   | Description                                             |
| ------------------- | ------------------------------------------------------------------- | ---------- | ------------------------------------------------------- | --------------------------------------------------------- |
| `src`               | `string`                                                            | No         | The source URL of the image.                            |
| `width`             | `number`                                                            | No         | Width of the image.                                     |
| `height`            | `number`                                                            | No         | Height of the image.                                    |
| `loaderUrl`         | `string`                                                            | No         | The URL of the image loader.                            |
| `responsives`       | `Responsive[]`                                                      | Yes        | An array of responsive configurations for the image.    |
| `transformOptions`  | `Omit<TransformOptions, 'src'                                       | 'origin'>` | Yes                                                     | The option configuration for the image.                   |
| `dprVariants`       | `number                                                             | number[]`  | Yes                                                     | Optional device pixel ratio (DPR) variants for the image. |
| `onLoadingComplete` | `(result: { naturalWidth: number; naturalHeight: number }) => void` | Yes        | A function to be called when image loading is complete. |
| `placeholder`       | `string`                                                            | Yes        | The placeholder URL for the image.                      |
| `fallback`          | `string`                                                            | Yes        | The fallback URL for the image.                         |
