# Overview

The `Textarea` component extends the functionality of the Ant Design TextArea component by providing additional customization and support for stricter type safety.

# Props

| Prop        | Type                                                 | Optional            | Default | Description                                                 |
| ----------- | ---------------------------------------------------- | ------------------- | ------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| className   | `string`                                             | Yes                 | -       | Custom CSS class for styling the text area.                 |
| disabled    | `boolean`                                            | Yes                 | false   | Whether the text area is disabled.                          |
| maxLength   | `number`                                             | Yes                 | -       | The maximum length of the input.                            |
| onBlur      | `(e: React.FocusEvent<HTMLTextAreaElement>) => void` | Yes                 | -       | Callback function triggered when the text area loses focus. |
| onFocus     | `(e: React.FocusEvent<HTMLTextAreaElement>) => void` | Yes                 | -       | Callback function triggered when the text area gains focus. |
| placeholder | `string`                                             | Yes                 | -       | Placeholder text for the text area.                         |
| prefix      | `ReactNode`                                          | Yes                 | -       | Prefix element for the text area.                           |
| showCount   | `boolean`                                            | Yes                 | true    | Whether to display the character count.                     |
| rows        | `number`                                             | Yes                 | 6       | Number of rows in the text area.                            |
| value       | `string`                                             | Yes                 | -       | The value of the text area.                                 |
| onChange    | `(value: string                                      | undefined) => void` | Yes     | -                                                           | Callback function triggered when the text area value changes. |

# Usage

```jsx
import { Textarea } from "path-to-Textarea";

// Example usage
<Textarea className="custom-textarea" disabled={false} maxLength={200} onBlur={() => console.log("Blur")} onFocus={() => console.log("Focus")} placeholder="Enter your text here..." prefix={<span>#</span>} showCount={true} rows={4} value="Initial text" onChange={(value) => console.log(value)} />;
```
