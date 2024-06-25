# Overview

The Table component extends the functionality of the Ant Design Table component by providing additional customization and support for stricter type safety.

# Props

| Prop                | Type     | Optional | Default  | Description                                                    |
| ------------------- | -------- | -------- | -------- | -------------------------------------------------------------- |
| currentPage         | number   | No       | -        | The current page number.                                       |
| pageSize            | number   | No       | -        | The number of items per page.                                  |
| totalRecords        | number   | No       | -        | The total number of records.                                   |
| onChange            | function | Yes      | -        | Callback function triggered when the page or pageSize changes. |
| plural              | function | Yes      | -        | Function to generate a plural label for the total count.       |
| singular            | function | Yes      | -        | Function to generate a singular label for the total count.     |
| paginationMode      | string   | Yes      | 'sticky' | The pagination mode.                                           |
| columns             | array    | Yes      | []       | An array of columns to be displayed in the table.              |
| nonePagination      | boolean  | Yes      | -        | Whether to disable pagination.                                 |
| showSizeChanger     | boolean  | Yes      | false    | Whether to show the size changer in pagination.                |
| paginationClassName | string   | Yes      | -        | Custom CSS class for the pagination.                           |
| locale              | object   | Yes      | -        | Locale object for the pagination.                              |
| sizeChangerOptions  | array    | Yes      | []       | Options for the size changer dropdown.                         |
| bordered            | boolean  | Yes      | true     | Whether the table has borders.                                 |
| className           | string   | Yes      | -        | Custom CSS class for the table.                                |
| dataSource          | array    | Yes      | -        | Data source for the table.                                     |
| expandable          | object   | Yes      | -        | Expandable configuration for the table.                        |
| direction           | string   | Yes      | -        | Direction of the table layout (ltr/rtl).                       |
| indentSize          | number   | Yes      | -        | Indentation size for the expandable rows.                      |
| loading             | boolean  | Yes      | -        | Loading state of the table.                                    |
| rowKey              | function | Yes      | -        | Key of each row.                                               |
| summary             | function | Yes      | -        | Summary row configuration.                                     |
| size                | string   | Yes      | -        | Size of the table (small/middle/large).                        |
| tableLayout         | string   | Yes      | -        | Layout of the table (auto/fixed).                              |

# Usage

```jsx
import { Table } from "path/to/Table";

// Example usage
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

<Table currentPage={1} pageSize={10} totalRecords={100} dataSource={dataSource} columns={columns} onChange={(page, pageSize) => console.log(page, pageSize)} />;
```
