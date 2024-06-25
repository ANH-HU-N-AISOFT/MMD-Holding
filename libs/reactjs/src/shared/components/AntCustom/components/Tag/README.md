# Overview

The Tag component extends the functionality of the Ant Design Tag component by providing additional customization options and support for stricter type safety.

# Props

| Prop      | Type      | Optional | Default | Description                           |
| --------- | --------- | -------- | ------- | ------------------------------------- |
| children  | ReactNode | Yes      | -       | The content of the tag.               |
| className | string    | Yes      | -       | Custom CSS class for styling the tag. |
| color     | string    | Yes      | -       | Color of the tag.                     |
| bordered  | boolean   | Yes      | true    | Whether the tag has a border.         |
| icon      | ReactNode | Yes      | -       | Icon to be displayed in the tag.      |

# Usage

```jsx
import { Tag } from "path/to/Tag";

// Example usage
<Tag color="blue" bordered={false} icon={<UserOutlined />}>
  Blue Tag
</Tag>;
```
