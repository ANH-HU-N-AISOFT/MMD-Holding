# Overview

The `Breadcrumb` component extends the functionality of the Ant Design Breadcrumb component by providing support for type safety and additional customization options. It allows for the rendering of breadcrumb items with stricter type checks compared to the standard Ant Design component.

# Props

| Prop      | Type                                                                     | Optional | Default | Description                                  |
| --------- | ------------------------------------------------------------------------ | -------- | ------- | -------------------------------------------- |
| items     | `Array<{ title: ReactNode; onClick?: () => void; className?: string; }>` | No       | -       | An array of breadcrumb items.                |
| className | `string`                                                                 | Yes      | ''      | Custom CSS class for styling the component.  |
| separator | `ReactNode`                                                              | Yes      | '/'     | Custom separator element for the breadcrumb. |

# Usage

```jsx
import { Breadcrumb } from "path-to-Breadcrumb";

// Example usage
<Breadcrumb items={[{ title: "Home" }, { title: "Products", onClick: handleProductsClick }, { title: "Details" }]} className="custom-breadcrumb" separator=">" />;
```
