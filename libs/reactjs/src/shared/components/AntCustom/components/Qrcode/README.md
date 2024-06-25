# Overview

The Qrcode component extends the functionality of the Ant Design QRCode component by providing additional customization and support for stricter type safety.

# Props

| Prop      | Type   | Optional | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| className | string | Yes      | -       | Custom CSS class for styling the QR code.                 |
| image     | string | Yes      | -       | URL of the image to display in the center of the QR code. |
| size      | number | Yes      | -       | Size of the QR code.                                      |
| value     | string | No       | -       | Value to encode in the QR code.                           |

# Usage

```jsx
import { Qrcode } from "path/to/Qrcode";

// Example usage
<Qrcode className="custom-qrcode" image="https://example.com/image.png" size={128} value="https://example.com" />;
```
