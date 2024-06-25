# Overview

The `Modal` component extends the functionality of the Ant Design Modal component by providing a customizable modal dialog with type safety. It leverages the properties of the Ant Design Modal, allowing for a seamless integration with additional customizations.

# Props

| Prop              | Type                  | Optional | Default | Description                                                                                      |
| ----------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------ |
| open              | `boolean`             | No       | -       | Whether the modal dialog is visible.                                                             |
| onCancel          | `() => void`          | No       | -       | Callback function invoked when the cancel button is clicked or the modal is closed.              |
| onOk              | `() => void`          | No       | -       | Callback function invoked when the OK button is clicked.                                         |
| className         | `string`              | Yes      | -       | Custom CSS class for styling the modal.                                                          |
| cancelText        | `string`              | Yes      | -       | Text of the cancel button.                                                                       |
| okText            | `string`              | Yes      | -       | Text of the OK button.                                                                           |
| maskClosable      | `boolean`             | Yes      | -       | Whether the modal can be closed by clicking the mask.                                            |
| zIndex            | `number`              | Yes      | -       | The z-index of the modal.                                                                        |
| width             | `string \| number`    | Yes      | -       | The width of the modal dialog.                                                                   |
| okButtonProps     | `ButtonProps`         | Yes      | -       | Properties for the OK button.                                                                    |
| cancelButtonProps | `ButtonProps`         | Yes      | -       | Properties for the cancel button.                                                                |
| centered          | `boolean`             | Yes      | -       | Whether to center the modal dialog vertically in the screen.                                     |
| closable          | `boolean`             | Yes      | -       | Whether a close (x) button is visible on top right of the modal dialog.                          |
| confirmLoading    | `boolean`             | Yes      | -       | Whether to apply a loading visual effect on the OK button while an operation is being performed. |
| children          | `ReactNode`           | Yes      | -       | Content to be displayed inside the modal.                                                        |
| title             | `ReactNode \| string` | Yes      | -       | Title of the modal dialog.                                                                       |
| footer            | `ReactNode \| null`   | Yes      | -       | Footer content of the modal dialog. Set to `null` to hide the default footer.                    |
| FooterLeft        | `ReactNode`           | Yes      | -       | Content to be displayed on the left side of the footer.                                          |
| footerMode        | `'sticky' \| 'none'`  | Yes      | -       | Mode of the footer, either 'sticky' or 'none'.                                                   |

# Usage

```jsx
import { Modal } from "path-to-Modal";

// Example usage
<Modal open={isVisible} onCancel={handleCancel} onOk={handleOk} className="custom-modal-class" cancelText="Cancel" okText="OK" maskClosable={false} zIndex={1000} width={600} okButtonProps={{ disabled: isSubmitting }} cancelButtonProps={{ disabled: isSubmitting }} centered closable confirmLoading={isSubmitting} title="Modal Title" footer={null}>
  <p>Modal Content</p>
</Modal>;
```
