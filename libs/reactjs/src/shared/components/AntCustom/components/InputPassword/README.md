# Overview

The `InputPassword` component extends the functionality of the Ant Design Password component by providing additional customization and support for stricter type safety.

# Props

| Prop            | Type                                              | Optional            | Default | Description                                                       |
| --------------- | ------------------------------------------------- | ------------------- | ------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| addonAfter      | `ReactNode`                                       | Yes                 | -       | The element to display on the right side of the input field.      |
| addonBefore     | `ReactNode`                                       | Yes                 | -       | The element to display on the left side of the input field.       |
| allowClear      | `boolean`                                         | Yes                 | true    | Whether to allow clear the input field.                           |
| className       | `string`                                          | Yes                 | -       | Custom CSS class for styling the input field.                     |
| disabled        | `boolean`                                         | Yes                 | false   | Whether the input field is disabled.                              |
| maxLength       | `number`                                          | Yes                 | -       | The maximum length of the input value.                            |
| onBlur          | `(e: React.FocusEvent<HTMLInputElement>) => void` | Yes                 | -       | Callback function triggered when the input field is blurred.      |
| onFocus         | `(e: React.FocusEvent<HTMLInputElement>) => void` | Yes                 | -       | Callback function triggered when the input field is focused.      |
| placeholder     | `string`                                          | Yes                 | -       | The placeholder text for the input field.                         |
| prefix          | `ReactNode`                                       | Yes                 | -       | The prefix icon or text for the input field.                      |
| value           | `string`                                          | Yes                 | -       | The value of the input field.                                     |
| onChange        | `(value: string                                   | undefined) => void` | Yes     | -                                                                 | Callback function triggered when the input value changes. |
| iconRender      | `(visible: boolean) => ReactNode`                 | Yes                 | -       | Custom icon render function for the visibility toggle button.     |
| visible         | `boolean`                                         | Yes                 | -       | Whether the password is shown or hidden.                          |
| onVisibleChange | `(visible: boolean) => void`                      | Yes                 | -       | Callback executed when the visibility of the password is changed. |

# Usage

```jsx
import { InputPassword } from "path-to-InputPassword";

// Example usage
<InputPassword className="custom-input-password" prefix={<Icon type="lock" />} suffix={<Icon type="eye" />} allowClear disabled={false} maxLength={20} onBlur={() => console.log("Blur")} onFocus={() => console.log("Focus")} value="password123" onChange={(value) => console.log(value)} iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} visible={true} onVisibleChange={(visible) => console.log(visible)} />;
```
