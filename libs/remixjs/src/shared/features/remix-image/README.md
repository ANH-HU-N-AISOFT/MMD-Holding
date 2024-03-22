# Overview

**remix-image** is a utility library designed to act as a wrapper around the [remix-image](https://github.com/Josh-McFarlin/remix-image) library. It aims to simplify the interaction with the library, providing an accessible interface for performing image transformations and manipulations.

# Usage
```jsx
// routes/public.images.ts
import { createLoader } from 'remixjs/server';

export const loader = createLoader({
  selfUrl: process.env.REMIX_SERVER_DOMAIN as string,
});

// Client
<Image
  src={image1}
  alt="Test"
  options={{ contentType: MimeType.WEBP }}
  placeholder="blur"
  responsive={[
    {
      size: { width: 100, height: 100 },
      maxWidth: 500,
    },
    {
      size: { width: 600, height: 600 },
    },
  ]}
/>
```
