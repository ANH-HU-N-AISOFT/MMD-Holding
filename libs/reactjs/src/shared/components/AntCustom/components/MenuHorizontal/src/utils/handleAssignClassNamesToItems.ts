import { MenuProps as AntMenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { HiddenItemClassName } from '../constants/HiddenItemClassName';
import { SubMenuClassName } from '../constants/SubMenuClassName';
import { MenuGroup, MenuItem, SubMenuItem } from '../MenuHorizontal';

export const handleAssignClassNamesToItems = <Key extends string>(
  items: Array<MenuItem<Key> | SubMenuItem<Key> | MenuGroup<Key>>,
): AntMenuProps['items'] => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index] as Exclude<ItemType, null>;
    const rawItem = items[index];

    const popupClassNameIsHandled = 'popupClassName' in item && item.popupClassName?.includes(SubMenuClassName);
    const hiddenClassNameIsHandled = item.className?.includes(HiddenItemClassName);
    if (hiddenClassNameIsHandled || popupClassNameIsHandled) {
      break;
    }

    //#region Item hidden class name
    if (rawItem.hidden) {
      item.className = classNames(item.className, HiddenItemClassName);
    }
    //#endregion

    //#region Popup class name
    const isGroup = 'type' in item && item.type === 'group';
    if ('children' in item && item.children && !isGroup) {
      item.popupClassName = classNames(item.popupClassName, SubMenuClassName);
      handleAssignClassNamesToItems(item.children as Array<MenuGroup<Key> | SubMenuItem<Key>>);
    }
    //#endregion
  }
  return items;
};
