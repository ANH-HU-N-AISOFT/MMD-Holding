Overview

The `Empty` component is a reusable React component designed to display an empty state when there's no data. It provides a structured layout for indicating an absence of content and allows customization by accepting various props.

## Props

| Prop          | Type                             | Optional | Description                                                                    |
| ------------- | -------------------------------- | -------- | ------------------------------------------------------------------------------ |
| `description` | `ReactNode`                      | Yes      | Description text or ReactNode to display as empty message. Default: 'No data'. |
| `...props`    | `HTMLAttributes<HTMLDivElement>` | Yes      | Other HTML attributes to pass to the component.                                |
