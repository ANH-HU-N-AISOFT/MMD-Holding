# SingleDayPicker

## Overview

The `SingleDayPicker` component allows users to select a single day, with optional time components. It provides various customization options such as disabling specific hours, minutes, and seconds.

## Props

| Prop            | Type                                                       | Optional | Default                                                     | Description                                                                                    |
| --------------- | ---------------------------------------------------------- | -------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| className       | `string`                                                   | Yes      | -                                                           | Custom CSS class for the date picker.                                                          |
| allowClear      | `boolean`                                                  | Yes      | `true`                                                      | Whether to show a clear button.                                                                |
| placeholder     | `string`                                                   | Yes      | -                                                           | Placeholder text for the input.                                                                |
| disabled        | `boolean`                                                  | Yes      | -                                                           | Whether the date picker is disabled.                                                           |
| presets         | `Object[]`                                                 | Yes      | -                                                           | Preset ranges for quick selection.                                                             |
| showNow         | `boolean`                                                  | Yes      | `true`                                                      | Whether to show the "Now" button.                                                              |
| disabledDate    | `Function`                                                 | Yes      | -                                                           | Function to specify the dates that should be disabled.                                         |
| suffixIcon      | `ReactNode`                                                | Yes      | -                                                           | Custom suffix icon for the date picker.                                                        |
| locale          | `Object`                                                   | Yes      | Custom locale configuration (see below for default values). | Locale configuration for the date picker.                                                      |
| disabledHours   | `() => number[]`                                           | Yes      | `() => []`                                                  | Function to specify the hours that should be disabled.                                         |
| disabledMinutes | `(params: { hours: number }) => number[]`                  | Yes      | `() => []`                                                  | Function to specify the minutes that should be disabled based on the selected hour.            |
| disabledSeconds | `(params: { hours: number; minutes: number }) => number[]` | Yes      | `() => []`                                                  | Function to specify the seconds that should be disabled based on the selected hour and minute. |
| format          | `string`                                                   | Yes      | `'DD/MM/YYYY'`                                              | Format for displaying the date and/or time.                                                    |
| value           | `Dayjs`                                                    | Yes      | -                                                           | The currently selected date and time.                                                          |
| onChange        | `(value: Dayjs \| undefined) => void`                      | Yes      | -                                                           | Callback function triggered when the selected date and time changes.                           |
| onBlur          | `() => void`                                               | Yes      | -                                                           | Callback function triggered when blur the date picker.                                         |
| onFocus         | `() => void`                                               | Yes      | -                                                           | Callback function triggered when focus the date picker.                                        |

##### Default Locale Configuration

```javascript
const defaultLocale = {
  lang: {
    locale: "en_US",
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"],
    today: "Today",
    now: "Now",
    backToToday: "Back to today",
    ok: "OK",
    clear: "Clear",
    month: "Month",
    year: "Year",
    timeSelect: "Select time",
    dateSelect: "Select date",
    monthSelect: "Choose a month",
    yearSelect: "Choose a year",
    decadeSelect: "Choose a decade",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
    shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  timePickerLocale: {
    placeholder: "Select time",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
```

## Usage

```typescript
import { SingleDayPicker } from "...";

// Example usage
<SingleDayPicker
  className="custom-class"
  allowClear={true}
  placeholder="Select date"
  disabled={false}
  presets={[{ label: 'Last 7 Days', value: dayjs().subtract(7, 'days') }]}
  showNow={true}
  disabledDate={(currentDate) => currentDate && currentDate < dayjs().endOf('day')}
  suffixIcon={<Icon type="calendar" />}
  locale={defaultLocale}
  disabledHours={() => [0, 1, 2, 3, 4, 5]}
  disabledMinutes={({ hours }) => (hours === 12 ? [0, 30] : [])}
  disabledSeconds={({ hours, minutes }) => (hours === 12 && minutes === 30 ? [0, 30] : [])}
  format="DD/MM/YYYY"
  value={dayjs().startOf('day')}
  onChange={(value) => console.log('Selected date:', value)}
/>;

```

# RangeDayPicker

## Overview

The `RangeDayPicker` component extends the functionality of the Ant Design DatePicker component by providing support for selecting a date range with additional configurations for disabling specific hours, minutes, and seconds. It enforces stricter type checks compared to the standard Ant Design DatePicker component.

## Props

| Prop            | Type                                                       | Optional | Default                                                     | Description                                                                                    |
| --------------- | ---------------------------------------------------------- | -------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| className       | `string`                                                   | Yes      | -                                                           | Custom CSS class for the date picker.                                                          |
| allowClear      | `boolean`                                                  | Yes      | `true`                                                      | Whether to show a clear button.                                                                |
| placeholder     | `[string, string]`                                         | Yes      | -                                                           | Placeholder text for the input.                                                                |
| disabled        | `boolean`                                                  | Yes      | -                                                           | Whether the date picker is disabled.                                                           |
| presets         | `Object[]`                                                 | Yes      | -                                                           | Preset ranges for quick selection.                                                             |
| showNow         | `boolean`                                                  | Yes      | `true`                                                      | Whether to show the "Now" button.                                                              |
| disabledDate    | `Function`                                                 | Yes      | -                                                           | Function to specify the dates that should be disabled.                                         |
| suffixIcon      | `ReactNode`                                                | Yes      | -                                                           | Custom suffix icon for the date picker.                                                        |
| locale          | `Object`                                                   | Yes      | Custom locale configuration (see below for default values). | Locale configuration for the date picker.                                                      |
| disabledHours   | `() => number[]`                                           | Yes      | `() => []`                                                  | Function to specify the hours that should be disabled.                                         |
| disabledMinutes | `(params: { hours: number }) => number[]`                  | Yes      | `() => []`                                                  | Function to specify the minutes that should be disabled based on the selected hour.            |
| disabledSeconds | `(params: { hours: number; minutes: number }) => number[]` | Yes      | `() => []`                                                  | Function to specify the seconds that should be disabled based on the selected hour and minute. |
| format          | `string`                                                   | Yes      | `'DD/MM/YYYY'`                                              | Format for displaying the date and time.                                                       |
| value           | `[Dayjs, Dayjs]`                                           | Yes      | -                                                           | Current value of the date range picker.                                                        |
| onChange        | `(value: [Dayjs, Dayjs] \| undefined) => void`             | Yes      | -                                                           | Callback function triggered when the selected date range changes.                              |
| onBlur          | `() => void`                                               | Yes      | -                                                           | Callback function triggered when blur the date picker.                                         |
| onFocus         | `() => void`                                               | Yes      | -                                                           | Callback function triggered when focus the date picker.                                        |

##### Default Locale Configuration

```javascript
const defaultLocale = {
  lang: {
    locale: "en_US",
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"],
    today: "Today",
    now: "Now",
    backToToday: "Back to today",
    ok: "OK",
    clear: "Clear",
    month: "Month",
    year: "Year",
    timeSelect: "Select time",
    dateSelect: "Select date",
    monthSelect: "Choose a month",
    yearSelect: "Choose a year",
    decadeSelect: "Choose a decade",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
    shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  timePickerLocale: {
    placeholder: "Select time",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
```

## Example

```typescript
import { RangeDayPicker } from "...";
// Example usage
<RangeDayPicker
  className="custom-class"
  allowClear={true}
  placeholder={["Start date", "End date"]}
  disabled={false}
  presets={[{ label: 'Last 7 Days', value: [dayjs().subtract(7, 'days'), dayjs()] }]}
  showNow={true}
  disabledDate={(currentDate) => currentDate && currentDate < dayjs().endOf('day')}
  suffixIcon={<Icon type="calendar" />}
  locale={defaultLocale}
  disabledHours={() => [0, 1, 2, 3, 4, 5]}
  disabledMinutes={({ hours }) => (hours === 12 ? [0, 30] : [])}
  disabledSeconds={({ hours, minutes }) => (hours === 12 && minutes === 30 ? [0, 30] : [])}
  format="DD/MM/YYYY"
  value={[dayjs().startOf('day'), dayjs().endOf('day')]}
  onChange={(value) => console.log('Selected date range:', value)}
/>;
```
