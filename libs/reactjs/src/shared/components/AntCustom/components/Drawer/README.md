# Overview

The Drawer component extends the functionality of the Ant Design Drawer component by providing additional customization and support for stricter type safety.

# Props

| Prop         | Type      | Optional | Default | Description                                                     |
| ------------ | --------- | -------- | ------- | --------------------------------------------------------------- |
| open         | boolean   | No       | -       | Whether the drawer is open.                                     |
| className    | string    | Yes      | -       | Custom CSS class for styling the drawer.                        |
| maskClosable | boolean   | Yes      | true    | Whether to close the drawer when the mask is clicked.           |
| onClose      | Function  | Yes      | -       | Callback function triggered when the drawer is closed.          |
| placement    | string    | Yes      | 'right' | The placement of the drawer ('top', 'right', 'bottom', 'left'). |
| title        | ReactNode | Yes      | -       | The title of the drawer.                                        |
| closeIcon    | ReactNode | Yes      | -       | The custom close icon.                                          |
| footer       | ReactNode | Yes      | -       | The footer of the drawer.                                       |
| children     | ReactNode | No       | -       | The content of the drawer.                                      |
| width        | number    | Yes      | -       | Width of the drawer.                                            |
| loading      | boolean   | Yes      | false   | Whether the drawer is in loading state.                         |

# Usage

```jsx
import { Drawer } from "path/to/Drawer";

// Example usage
<Drawer open={true} className="custom-drawer" maskClosable={true} onClose={() => console.log("Drawer closed")} placement="right" title="Drawer Title" closeIcon={<CustomCloseIcon />} footer={<div>Footer Content</div>} width={300} loading={false}>
  <p>Drawer Content</p>
</Drawer>;
```
