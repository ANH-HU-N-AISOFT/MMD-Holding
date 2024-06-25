# Overview

The Dropdown component extends the functionality of the Ant Design Dropdown component by providing additional customization and support for stricter type safety.

# Props

| Prop       | Type       | Optional | Default | Description                                               |
| ---------- | ---------- | -------- | ------- | --------------------------------------------------------- |
| children   | ReactNode  | Yes      | -       | The trigger element for the dropdown.                     |
| className  | string     | Yes      | -       | Custom CSS class for styling the dropdown.                |
| items      | MenuItem[] | Yes      | -       | The menu items to be displayed.                           |
| expandIcon | ReactNode  | Yes      | -       | The icon for expanding the menu items.                    |
| footer     | ReactNode  | Yes      | -       | The footer to be displayed at the bottom of the dropdown. |
| arrow      | boolean    | Yes      | true    | Whether to show the arrow on the dropdown.                |
| trigger    | string[]   | Yes      | -       | The trigger mode of the dropdown.                         |

# Usage

```jsx
import { Dropdown } from "path/to/Dropdown";

// Example usage
const items = [
  {
    key: "1",
    label: "Item 1",
    icon: <ItemIcon />,
    children: [
      {
        key: "1-1",
        label: "Sub Item 1-1",
      },
      {
        key: "1-2",
        label: "Sub Item 1-2",
      },
    ],
  },
  {
    key: "2",
    label: "Item 2",
  },
];

<Dropdown className="custom-dropdown" items={items} expandIcon={<ExpandIcon />} footer={<div>Footer Content</div>} trigger={["click"]}>
  <a href="#">Click me</a>
</Dropdown>;
```
