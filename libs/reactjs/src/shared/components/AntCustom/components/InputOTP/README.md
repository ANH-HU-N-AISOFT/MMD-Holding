# Overview

The `InputOTP` component extends the functionality of the Ant Design OTP Input component by providing additional customization and support for stricter type safety.

# Props

| Prop      | Type                                              | Optional            | Default | Description                                                  |
| --------- | ------------------------------------------------- | ------------------- | ------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| className | `string`                                          | Yes                 | -       | Custom CSS class for styling the input field.                |
| disabled  | `boolean`                                         | Yes                 | false   | Whether the input field is disabled.                         |
| onBlur    | `(e: React.FocusEvent<HTMLInputElement>) => void` | Yes                 | -       | Callback function triggered when the input field is blurred. |
| onFocus   | `(e: React.FocusEvent<HTMLInputElement>) => void` | Yes                 | -       | Callback function triggered when the input field is focused. |
| value     | `string`                                          | Yes                 | -       | The value of the input field.                                |
| onChange  | `(value: string                                   | undefined) => void` | Yes     | -                                                            | Callback function triggered when the input value changes. |
| length    | `number`                                          | No                  | -       | The length of the OTP input.                                 |
| formatter | `(value: string) => string`                       | Yes                 | -       | A function for formatting the displayed value.               |
| mask      | `boolean`                                         | Yes                 | -       | Whether to mask the input characters.                        |

# Usage

```jsx
import { InputOTP } from "path-to-InputOTP";

// Example usage
<InputOTP className="custom-input-otp" disabled={false} length={6} onBlur={() => console.log("Blur")} onFocus={() => console.log("Focus")} value="123456" onChange={(value) => console.log(value)} formatter={(value) => value.replace(/./g, "*")} mask />;
```
