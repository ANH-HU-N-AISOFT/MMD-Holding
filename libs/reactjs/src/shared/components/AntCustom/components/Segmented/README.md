# Overview

The Segmented component extends the functionality of the Ant Design Segmented component by providing additional customization and support for stricter type safety.

# Props

| Prop      | Type     | Optional | Default | Description                                                                   |
| --------- | -------- | -------- | ------- | ----------------------------------------------------------------------------- |
| className | string   | Yes      | -       | Custom CSS class for styling the segmented control.                           |
| block     | boolean  | Yes      | -       | Whether the segmented control should take up the full width of its container. |
| disabled  | boolean  | Yes      | -       | Whether the segmented control is disabled.                                    |
| items     | array    | Yes      | []      | The items to be displayed in the segmented control.                           |
| value     | string   | Yes      | -       | The value of the segmented control.                                           |
| onChange  | function | Yes      | -       | Callback function triggered when the value changes.                           |

# Usage

```jsx
import { Segmented } from "path/to/Segmented";

// Example usage
const items = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2", icon: <SomeIcon /> },
  { label: "Option 3", value: "3", disabled: true },
];

<Segmented items={items} value="1" onChange={(newValue) => console.log(newValue)} />;
```
