# Overview

A customizable switch component that extends the functionality of the Ant Design Switch component by providing additional customization options and support for stricter type safety.

# Props

| Prop              | Type                       | Optional | Default | Description                                                |
| ----------------- | -------------------------- | -------- | ------- | ---------------------------------------------------------- |
| checked           | `boolean`                  | Yes      | -       | The initial checked state of the switch.                   |
| checkedChildren   | `React.ReactNode`          | Yes      | -       | The content to be rendered when the switch is checked.     |
| className         | `string`                   | Yes      | -       | Custom CSS class for styling the switch.                   |
| disabled          | `boolean`                  | Yes      | `false` | Whether the switch is disabled.                            |
| loading           | `boolean`                  | Yes      | -       | Whether to display loading state of switch.                |
| onChange          | `(value: boolean) => void` | Yes      | -       | Callback function triggered when the switch state changes. |
| unCheckedChildren | `React.ReactNode`          | Yes      | -       | The content to be rendered when the switch is unchecked.   |

# Usage

```jsx
import { Switch } from "path-to-Switch";

// Example usage
<Switch checked={true} checkedChildren="Enabled" unCheckedChildren="Disabled" className="custom-switch" disabled={false} loading={false} onChange={(value) => console.log("Switch state changed:", value)} />;
```
