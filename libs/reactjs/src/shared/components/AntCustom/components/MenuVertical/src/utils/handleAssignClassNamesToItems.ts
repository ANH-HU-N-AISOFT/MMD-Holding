import { MenuProps as AntMenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { HiddenItemClassName } from '../constants/HiddenItemClassName';
import { MenuGroup, MenuItem, SubMenuItem } from '../MenuVertical';

export const handleAssignClassNamesToItems = <Key extends string>(
  items: Array<MenuItem<Key> | SubMenuItem<Key> | MenuGroup<Key>>,
): AntMenuProps['items'] => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as Exclude<ItemType, null>;
    const rawItem = items[index];

    const hiddenClassNameIsHandled = item.className?.includes(HiddenItemClassName);
    if (hiddenClassNameIsHandled) {
      break;
    }

    //#region Item hidden class name
    if (rawItem.hidden) {
      item.className = classNames(item.className, HiddenItemClassName);
    }
    //#endregion
  }
  return items;
};
