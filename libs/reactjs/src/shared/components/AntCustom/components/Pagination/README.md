# Overview

The Pagination component extends the functionality of the Ant Design Pagination component by providing additional customization and support for stricter type safety.

# Props

| Prop            | Type     | Optional | Default | Description                                                     |
| --------------- | -------- | -------- | ------- | --------------------------------------------------------------- |
| className       | string   | Yes      | -       | Custom CSS class for styling the pagination component.          |
| currentPage     | number   | No       | -       | The current page number.                                        |
| disabled        | boolean  | Yes      | -       | Whether the pagination is disabled.                             |
| onChange        | function | Yes      | -       | Callback function triggered when the page or page size changes. |
| pageSize        | number   | No       | -       | The number of items per page.                                   |
| pageSizeOptions | number[] | Yes      | []      | Custom page size options for the pagination.                    |
| pageSizeText    | string   | Yes      | / page  | Custom text to display for page size.                           |
| showSizeChanger | boolean  | Yes      | false   | Whether to show the size changer in pagination.                 |
| total           | number   | No       | -       | The total number of items.                                      |

# Usage

```jsx
import { Pagination } from "path/to/Pagination";

// Example usage
<Pagination currentPage={1} pageSize={10} total={100} onChange={(page, pageSize) => console.log("Page:", page, "PageSize:", pageSize)} pageSizeOptions={[10, 20, 30, 40]} pageSizeText="/ page" showSizeChanger />;
```
