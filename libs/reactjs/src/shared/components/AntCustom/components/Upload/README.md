# UploadSingle

## Overview

`UploadSingle` is a custom React component that extends the functionality of the Ant Design `Upload` component. It provides additional customization and stricter type safety, making it easier to handle single file uploads in your React application.

## Props

| Prop Name       | Type                                                                                                      | Description                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `value`         | `FileState<Response>`                                                                                     | The current state of the file being uploaded.                                                             |
| `request`       | `(params: { file: File; onUploadProgress: AxiosRequestConfig['onUploadProgress'] }) => Promise<Response>` | A function that handles the file upload request. It receives the file and an `onUploadProgress` callback. |
| `onStateChange` | `(filesState: FileState<Response> \| undefined) => void`                                                  | Callback function that is triggered when the state of the file changes.                                   |
| `className`     | `string`                                                                                                  | Custom CSS class for styling the upload component.                                                        |
| `children`      | `ReactNode`                                                                                               | The content to be displayed inside the upload area.                                                       |
| `disabled`      | `boolean`                                                                                                 | Whether the upload component is disabled.                                                                 |
| `accept`        | `string`                                                                                                  | The file types that can be accepted by the upload component.                                              |

## Usage

Here's an example of how to use the `UploadSingle` component:

```jsx
import React, { useState } from "react";
import { UploadSingle, FileState } from "./UploadSingle";
import axios from "axios";

const App = () => {
  const [fileState, setFileState] = useState(undefined);

  const handleUpload = async ({ file, onUploadProgress }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/upload", formData, {
      onUploadProgress,
    });

    return response.data;
  };

  const handleStateChange = (state) => {
    setFileState(state);
  };

  return (
    <UploadSingle value={fileState} request={handleUpload} onStateChange={handleStateChange} accept=".jpg,.png">
      <p>Drag and drop a file here or click to select a file</p>
    </UploadSingle>
  );
};

export default App;
```

# UploadMultiple

## Overview

`UploadMultiple` is a custom React component that extends the functionality of the Ant Design `Upload` component. It provides additional customization and stricter type safety, making it easier to handle multiple file uploads in your React application.

## Props

| Prop Name       | Type                                                                                                      | Description                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `value`         | `FileState<Response>[]`                                                                                   | The current state of the files being uploaded.                                                            |
| `request`       | `(params: { file: File; onUploadProgress: AxiosRequestConfig['onUploadProgress'] }) => Promise<Response>` | A function that handles the file upload request. It receives the file and an `onUploadProgress` callback. |
| `onStateChange` | `(filesState: FileState<Response>[] \| undefined) => void`                                                | Callback function that is triggered when the state of the files changes.                                  |
| `className`     | `string`                                                                                                  | Custom CSS class for styling the upload component.                                                        |
| `children`      | `ReactNode`                                                                                               | The content to be displayed inside the upload area.                                                       |
| `disabled`      | `boolean`                                                                                                 | Whether the upload component is disabled.                                                                 |
| `accept`        | `string`                                                                                                  | The file types that can be accepted by the upload component.                                              |
| `maxCount`      | `number`                                                                                                  | The maximum number of files that can be uploaded. Default is `Number.MAX_SAFE_INTEGER`.                   |
| `beforeUpload`  | `(file: RcFile, FileList: RcFile[]) => boolean \| Promise<void>`                                          | Hook to check or modify file before uploading.                                                            |

## Usage

Here's an example of how to use the `UploadMultiple` component:

```jsx
import React, { useState } from "react";
import { UploadMultiple, FileState } from "./UploadMultiple";
import axios from "axios";

const App = () => {
  const [fileState, setFileState] = useState([]);

  const handleUpload = async ({ file, onUploadProgress }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/upload", formData, {
      onUploadProgress,
    });

    return response.data;
  };

  const handleStateChange = (state) => {
    setFileState(state || []);
  };

  return (
    <UploadMultiple value={fileState} request={handleUpload} onStateChange={handleStateChange} accept=".jpg,.png" maxCount={5}>
      <p>Drag and drop files here or click to select files</p>
    </UploadMultiple>
  );
};

export default App;
```
