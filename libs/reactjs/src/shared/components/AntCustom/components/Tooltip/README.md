# Overview

The Tooltip component extends the functionality of the Ant Design Tooltip component by providing additional customization and support for stricter type safety.

# Props

| Prop             | Type             | Optional | Default | Description                                                                |
| ---------------- | ---------------- | -------- | ------- | -------------------------------------------------------------------------- |
| className        | string           | Yes      | -       | Custom CSS class for styling the tooltip.                                  |
| arrow            | boolean          | Yes      | true    | Whether to display an arrow pointing to the reference element.             |
| children         | ReactNode        | Yes      | -       | The trigger of the tooltip.                                                |
| color            | string           | Yes      | -       | The color of the tooltip.                                                  |
| content          | string/ReactNode | Yes      | -       | The content of the tooltip.                                                |
| trigger          | string           | Yes      | -       | The trigger mode which can be 'hover', 'focus', 'click', or 'contextMenu'. |
| overlayClassName | string           | Yes      | -       | Custom CSS class for the overlay.                                          |
| disabled         | boolean          | Yes      | false   | Whether the tooltip is disabled.                                           |

# Usage

```jsx
import { Tooltip } from "path/to/Tooltip";

// Example usage
<Tooltip content="Tooltip text" disabled={false}>
  <span>Hover over me</span>
</Tooltip>;
```
