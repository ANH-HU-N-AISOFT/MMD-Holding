# Overview

The Popover component extends the functionality of the Ant Design Popover component by providing additional customization and support for stricter type safety.

# Props

| Prop             | Type             | Optional | Default | Description                                                                |
| ---------------- | ---------------- | -------- | ------- | -------------------------------------------------------------------------- |
| className        | string           | Yes      | -       | Custom CSS class for styling the popover.                                  |
| arrow            | boolean          | Yes      | true    | Whether to display an arrow pointing to the reference element.             |
| children         | ReactNode        | Yes      | -       | The trigger of the popover.                                                |
| color            | string           | Yes      | -       | The color of the popover.                                                  |
| content          | string/ReactNode | Yes      | -       | The content of the popover.                                                |
| trigger          | string           | Yes      | -       | The trigger mode which can be 'hover', 'focus', 'click', or 'contextMenu'. |
| overlayClassName | string           | Yes      | -       | Custom CSS class for the overlay.                                          |
| disabled         | boolean          | Yes      | false   | Whether the popover is disabled.                                           |

# Usage

```jsx
import { Popover } from "path/to/Popover";

// Example usage
<Popover content="Popover text" disabled={false}>
  <span>Hover over me</span>
</Popover>;
```
