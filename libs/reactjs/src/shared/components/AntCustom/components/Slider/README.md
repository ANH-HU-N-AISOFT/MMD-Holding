# SingleSlider

## Overview

The SingleSlider component extends the functionality of the Ant Design Slider component by providing additional customization and support for stricter type safety.

## Props

| Prop             | Type                      | Optional | Default | Description                                                 |
| ---------------- | ------------------------- | -------- | ------- | ----------------------------------------------------------- |
| className        | string                    | Yes      | -       | Custom CSS class for styling the slider.                    |
| disabled         | boolean                   | Yes      | false   | Whether the slider is disabled.                             |
| value            | number                    | Yes      | -       | The value of the slider.                                    |
| onChange         | function                  | Yes      | -       | Callback function triggered when the slider value changes.  |
| step             | number                    | Yes      | -       | The granularity the slider can step through values.         |
| min              | number                    | Yes      | 0       | The minimum value the slider can slide to.                  |
| max              | number                    | Yes      | 100     | The maximum value the slider can slide to.                  |
| onBlur           | function                  | Yes      | -       | Callback function triggered when the slider loses focus.    |
| onFocus          | function                  | Yes      | -       | Callback function triggered when the slider gains focus.    |
| vertical         | boolean                   | Yes      | false   | Whether the slider is vertical.                             |
| direction        | 'ltr' \| 'rtl'            | Yes      | 'ltr'   | The direction of the slider.                                |
| tooltipFormatter | Formatter                 | Yes      | -       | Formatter function for the tooltip.                         |
| hideCoordinative | boolean                   | Yes      | false   | Whether to hide the coordinative (the track of the slider). |
| marks            | Record<number, ReactNode> | Yes      | {}      | Marks on the slider track.                                  |

## Usage

```jsx
import { SingleSlider } from "path/to/SingleSlider";

// Example usage
<SingleSlider className="custom-slider" disabled={false} value={50} onChange={(value) => console.log("Slider value:", value)} step={5} min={0} max={100} direction="ltr" tooltipFormatter={(value) => `${value}%`} hideCoordinative={false} vertical={false} marks={{ 0: "0%", 50: "50%", 100: "100%" }} />;
```

# RangeSlider

# Overview

The RangeSlider component extends the functionality of the Ant Design Slider component by providing additional customization and support for stricter type safety.

## Props

| Prop             | Type                      | Optional | Default | Description                                                 |
| ---------------- | ------------------------- | -------- | ------- | ----------------------------------------------------------- |
| className        | string                    | Yes      | -       | Custom CSS class for styling the slider.                    |
| disabled         | boolean                   | Yes      | false   | Whether the slider is disabled.                             |
| value            | [number, number]          | Yes      | -       | The value of the slider.                                    |
| onChange         | function                  | Yes      | -       | Callback function triggered when the slider value changes.  |
| step             | number                    | Yes      | -       | The granularity the slider can step through values.         |
| min              | number                    | Yes      | 0       | The minimum value the slider can slide to.                  |
| max              | number                    | Yes      | 100     | The maximum value the slider can slide to.                  |
| onBlur           | function                  | Yes      | -       | Callback function triggered when the slider loses focus.    |
| onFocus          | function                  | Yes      | -       | Callback function triggered when the slider gains focus.    |
| vertical         | boolean                   | Yes      | false   | Whether the slider is vertical.                             |
| direction        | 'ltr' \| 'rtl'            | Yes      | 'ltr'   | The direction of the slider.                                |
| tooltipFormatter | Formatter                 | Yes      | -       | Formatter function for the tooltip.                         |
| hideCoordinative | boolean                   | Yes      | false   | Whether to hide the coordinative (the track of the slider). |
| marks            | Record<number, ReactNode> | Yes      | {}      | Marks on the slider track.                                  |

## Usage

```jsx
import { RangeSlider } from "path/to/RangeSlider";

// Example usage
<RangeSlider className="custom-slider" disabled={false} value={[20, 50]} onChange={(value) => console.log("Slider value:", value)} step={5} min={0} max={100} direction="ltr" tooltipFormatter={(value) => `${value}%`} hideCoordinative={false} vertical={false} marks={{ 0: "0%", 50: "50%", 100: "100%" }} />;
```
