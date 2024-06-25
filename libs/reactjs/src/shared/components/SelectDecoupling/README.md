# Overview

The `SelectSingleDecoupling` and `SelectMultipleDecoupling` components are decoupled versions of the Select components, providing a more flexible approach for working with select inputs. They separate the data fetching and option transformation functions, allowing for better customization and reusability.

# Props

| Prop                  | Type                                                                                   | Optional | Default | Description                                                                           |
| --------------------- | -------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `service`             | `() => Promise<Model[]> \| Model[]`                                                    | No       | -       | A function to fetch data from a service.                                              |
| `transformToOption`   | `(model: Model, index?: number) => OptionRawDataWithSearchValue<Model>`                | No       | -       | A function to transform the fetched model data into options for the Select component. |
| `onChange`            | `(value: ModelId \| undefined, option: OptionWithRawData<Model> \| undefined) => void` | Yes      | -       | Callback function triggered when the selected value changes.                          |
| `depsFetch`           | `DependencyList`                                                                       | Yes      | -       | An array of dependencies to watch for fetching data.                                  |
| `depsTransformOption` | `DependencyList`                                                                       | Yes      | -       | An array of dependencies to watch for transforming options.                           |
| `...restProps`        |                                                                                        |          |         |                                                                                       |

## Usage

```jsx
import React, { useState } from 'react';
import { SelectSingleDecoupling, SelectMultipleDecoupling } from 'path-to-SelectDecoupling-components'; // Replace 'path-to-SelectDecoupling-components' with the actual path to your components

function MySelect() {
  const [selectedValue, setSelectedValue] = useState<ModelId | undefined>(undefined);
  const [data, setData] = useState<Model[]>([]); // Your data array

  const fetchData = async () => {
    // Fetch data from a service
    const newData = await yourServiceFunction();
    setData(newData);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const transformToOption = (model: Model) => {
    // Transform model data to options
    return {
      value: model.id,
      label: model.name,
    };
  };

  const handleChange = (value: ModelId | undefined, option: OptionWithRawData<Model> | undefined) => {
    // Handle selected value change
    setSelectedValue(value);
    console.log('Selected value:', value);
  };

  return (
    <>
      <SelectSingleDecoupling
        service={fetchData}
        transformToOption={transformToOption}
        onChange={handleChange}
        value={selectedValue}
        options={data}
        placeholder="Select a single option"
      />
      <SelectMultipleDecoupling
        service={fetchData}
        transformToOption={transformToOption}
        onChange={handleChange}
        value={selectedValue}
        options={data}
        placeholder="Select multiple options"
      />
    </>
  );
}

export default MySelect;
```
