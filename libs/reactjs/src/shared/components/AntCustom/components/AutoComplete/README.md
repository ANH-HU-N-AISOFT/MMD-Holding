# Props

| Prop                    | Type                                                                               | Optional | Default            | Description                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- | -------- | ------------------ | -------------------------------------------------------------------------------------- |
| allowClear              | `boolean`                                                                          | Yes      | `true`             | Whether to show a clear button allowing the user to clear the input.                   |
| disabled                | `boolean`                                                                          | Yes      | -                  | Whether the AutoComplete component is disabled.                                        |
| placeholder             | `string`                                                                           | Yes      | -                  | Placeholder text to display when the input is empty.                                   |
| className               | `string`                                                                           | Yes      | -                  | Custom CSS class for styling the component.                                            |
| notFoundContent         | `ReactNode`                                                                        | Yes      | -                  | Content to display when no options match the input.                                    |
| loading                 | `boolean`                                                                          | Yes      | `false`            | Whether the component is in a loading state, showing a loading indicator.              |
| value                   | `ValueType`                                                                        | Yes      | -                  | The current value of the input.                                                        |
| onChange                | `(value: ValueType \| undefined, option?: Option<ValueType, RawData>) => void`     | Yes      | -                  | Callback function that is triggered when the input value changes.                      |
| filterOption            | `boolean \| ((inputValue: string, option: Option<ValueType, RawData>) => boolean)` | Yes      | `baseFilterOption` | Custom filter function to determine whether an option should be shown in the dropdown. |
| options                 | `Option<ValueType, RawData>[]`                                                     | Yes      | `[]`               | Array of options to be displayed in the dropdown menu.                                 |
| onBlur                  | `Function`                                                                         | Yes      | -                  | Callback function that is triggered when the input loses focus.                        |
| onFocus                 | `Function`                                                                         | Yes      | -                  | Callback function that is triggered when the input gains focus.                        |
| searchValue             | `string`                                                                           | Yes      | -                  | The value of the search input.                                                         |
| open                    | `boolean`                                                                          | Yes      | -                  | Whether the dropdown menu is open.                                                     |
| onDropdownVisibleChange | `Function`                                                                         | Yes      | -                  | Callback function that is triggered when the dropdown visibility changes.              |
| onSearch                | `Function`                                                                         | Yes      | -                  | Callback function that is triggered when the search input value changes.               |

# Usage

```jsx
import { AutoComplete } from "path-to-AutoComplete";

// Example usage
<AutoComplete allowClear disabled={false} placeholder="Search..." className="custom-class" notFoundContent="No matches found" loading={true} value={inputValue} onChange={handleInputChange} filterOption={(inputValue, option) => option.value.includes(inputValue)} options={optionsList} onBlur={handleBlur} onFocus={handleFocus} searchValue={searchValue} open={isDropdownOpen} onDropdownVisibleChange={handleDropdownVisibleChange} onSearch={handleSearch} />;
```
