# Overview

The Popconfirm component extends the functionality of the Ant Design Popconfirm component by providing additional customization and support for stricter type safety.

# Props

| Prop              | Type             | Optional | Default | Description                                                    |
| ----------------- | ---------------- | -------- | ------- | -------------------------------------------------------------- |
| open              | `boolean`        | No       | -       | Whether the Popconfirm is visible.                             |
| arrow             | boolean          | Yes      | true    | Whether to display an arrow pointing to the reference element. |
| cancelButtonProps | object           | Yes      | -       | Properties for the cancel button.                              |
| cancelText        | string/ReactNode | Yes      | -       | The text of the cancel button.                                 |
| children          | ReactNode        | Yes      | -       | The content of the Popconfirm.                                 |
| className         | string           | Yes      | -       | Custom CSS class for styling the Popconfirm.                   |
| content           | string/ReactNode | Yes      | -       | The content of the Popconfirm.                                 |
| disabled          | boolean          | Yes      | -       | Whether the Popconfirm is disabled.                            |
| okButtonProps     | object           | Yes      | -       | Properties for the OK button.                                  |
| okText            | string/ReactNode | Yes      | -       | The text of the OK button.                                     |
| onCancel          | function         | Yes      | -       | Callback function triggered when the cancel button is clicked. |
| onConfirm         | function         | Yes      | -       | Callback function triggered when the OK button is clicked.     |

# Usage

```jsx
import { Popconfirm } from "path/to/Popconfirm";
import { Button } from "path/to/Button";

// Example usage
<Popconfirm content="Are you sure you want to delete this?" onConfirm={() => console.log("Confirmed")} onCancel={() => console.log("Cancelled")} okText="Yes" cancelText="No">
  <Button>Delete</Button>
</Popconfirm>;
```
