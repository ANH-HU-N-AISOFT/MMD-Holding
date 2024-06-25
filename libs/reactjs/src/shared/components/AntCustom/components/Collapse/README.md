# Overview

The `Collapse` component extends the functionality of the Ant Design Collapse component by providing additional customization and support for stricter type safety. It allows for controlled or uncontrolled states and provides a flexible API for handling multiple panels.

# Props

| Prop        | Type                                                                                                                                                     | Optional | Default  | Description                                                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| className   | `string`                                                                                                                                                 | Yes      | -        | Custom CSS class for styling the collapse component.                                                                          |
| bordered    | `boolean`                                                                                                                                                | Yes      | true     | Whether to show a border around the collapse component.                                                                       |
| accordion   | `boolean`                                                                                                                                                | Yes      | -        | If true, only one panel can be expanded at a time.                                                                            |
| items       | `Array<{ key: Key; label: ReactNode; children: ReactNode; className?: string; onClick?: () => void; hidden?: boolean; collapsible?: CollapsibleType; }>` | Yes      | []       | Array of items to be rendered in the Collapse component. Each item represents a panel with its content and settings.          |
| value       | `Key` \| `Key[]`                                                                                                                                         | Yes      | -        | The key(s) of the active panel(s). When `accordion` is true, it expects a single key. Otherwise, it expects an array of keys. |
| onChange    | `Accordion extends true ? (value: Key \| undefined) => void : (value: Key[] \| undefined) => void`                                                       | Yes      | -        | Callback function triggered when the active panel(s) change.                                                                  |
| collapsible | `CollapsibleType`                                                                                                                                        | Yes      | 'header' | Specify if the panel can be collapsed. Can be 'header', 'disabled', or undefined.                                             |

# Usage

```jsx
import { Collapse } from "path-to-Collapse";

// Example usage
<Collapse
  className="custom-collapse"
  bordered={false}
  accordion
  value="panel1"
  onChange={(value) => console.log(value)}
  items={[
    {
      key: "panel1",
      label: "Panel 1",
      children: <div>Content for Panel 1</div>,
      className: "panel1-class",
    },
    {
      key: "panel2",
      label: "Panel 2",
      children: <div>Content for Panel 2</div>,
      className: "panel2-class",
      hidden: false,
    },
  ]}
/>;
```
