# Overview

The `Alert` component extends the functionality of the Ant Design Alert component by providing additional customization and support for stricter type safety. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Alert component.

# Props

| Prop        | Type        | Optional | Default   | Description                                  |
| ----------- | ----------- | -------- | --------- | -------------------------------------------- |
| className   | `string`    | Yes      | -         | Custom CSS class for styling the alert.      |
| color       | `Color`     | Yes      | 'primary' | Custom color for the alert.                  |
| variant     | `Variant`   | Yes      | 'bold'    | Variant style of the alert.                  |
| message     | `ReactNode` | No       | -         | Main message content of the alert.           |
| description | `ReactNode` | No       | -         | Additional description content of the alert. |
| icon        | `ReactNode` | Yes      | -         | Custom icon for the alert.                   |

# Usage

```jsx
import { Alert } from "path-to-Alert";

// Example usage
<Alert className="custom-alert" color="success" variant="outlined" message="This is a success alert!" description="Additional description for the alert." icon={<IconComponent />} />;
```
