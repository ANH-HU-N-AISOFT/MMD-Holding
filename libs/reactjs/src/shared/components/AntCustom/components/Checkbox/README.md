# Overview

The `Checkbox` component extends the functionality of the Ant Design Checkbox component by providing additional customization and support for stricter type safety. It maintains its own state and triggers a callback function when its state changes.

# Props

| Prop          | Type                       | Optional | Default | Description                                                  |
| ------------- | -------------------------- | -------- | ------- | ------------------------------------------------------------ |
| children      | `ReactNode`                | Yes      | -       | Content to be displayed next to the checkbox.                |
| className     | `string`                   | Yes      | -       | Custom CSS class for styling the checkbox.                   |
| checked       | `boolean`                  | Yes      | -       | Whether the checkbox is checked.                             |
| disabled      | `boolean`                  | Yes      | -       | Whether the checkbox is disabled.                            |
| indeterminate | `boolean`                  | Yes      | -       | Whether the checkbox is indeterminate.                       |
| onChange      | `(value: boolean) => void` | Yes      | -       | Callback function triggered when the checkbox state changes. |

# Usage

```jsx
import { Checkbox } from "path-to-Checkbox";

// Example usage
<Checkbox className="custom-checkbox" checked={true} disabled={false} indeterminate={false} onChange={(value) => console.log(value)} />;
```
