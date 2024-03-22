# Overview

The `FixedProgressLoader` component is a React component designed to display a fixed progress loader at the top of a page, indicating the loading status. This loader is useful in scenarios where you want to visually represent ongoing processes or content loading.

# Props

| Prop                 | Type      | Optional | Description                                                                                 |
| -------------------- | --------- | -------- | ------------------------------------------------------------------------------------------- |
| `done`               | `boolean` | No       | Indicates whether the loading is complete or not.                                           |
| `duration`           | `number`  | Yes      | Duration of the progress bar animation in milliseconds. Defaults to 300ms if not specified. |
| `containerClassName` | `string`  | Yes      | Class name for the container element that wraps the progress bar.                           |
| `barClassName`       | `string`  | Yes      | Class name for the progress bar element.                                                    |
