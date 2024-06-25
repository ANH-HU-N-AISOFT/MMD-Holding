# Overview

The Tabs component extends the functionality of the Ant Design Tabs component by providing additional customization and support for stricter type safety.

# Props

| Prop        | Type                                                                                                | Optional | Default | Description                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| className   | string                                                                                              | Yes      | -       | Custom CSS class for styling the tabs.                                                             |
| tabs        | Array<{ key: string, label: ReactNode, children: ReactNode, disabled?: boolean, hidden?: boolean }> | Yes      | []      | Array of tab objects containing key, label, children, and optional disabled and hidden properties. |
| tabActive   | string                                                                                              | Yes      | -       | The key of the currently active tab.                                                               |
| onChange    | function                                                                                            | Yes      | -       | Callback function triggered when the active tab changes.                                           |
| moreIcon    | ReactNode                                                                                           | Yes      | -       | Icon for the "more" button.                                                                        |
| tabPosition | string                                                                                              | Yes      | 'top'   | The position of the tabs.                                                                          |
| autoFit     | boolean                                                                                             | Yes      | -       | Whether the tabs should auto fit.                                                                  |

# Usage

```jsx
import { Tabs } from "path/to/Tabs";

// Example usage
<Tabs
  className="custom-tabs"
  tabs={[
    { key: "tab1", label: "Tab 1", children: <div>Content 1</div> },
    { key: "tab2", label: "Tab 2", children: <div>Content 2</div> },
  ]}
  tabActive="tab1"
  onChange={(key) => console.log("Active tab key:", key)}
  moreIcon={<Icon type="ellipsis" />}
  tabPosition="top"
  autoFit={true}
/>;
```