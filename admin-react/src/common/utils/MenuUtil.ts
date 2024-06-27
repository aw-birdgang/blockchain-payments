import {IMenuItem} from "@/common/models/interfaces";

export class MenuUtil {
  private static instance: MenuUtil
  private constructor() {}

  /**
   * 서버에서 가져온 메뉴 목록 데이터를 ui 에서 사용할 수 있도록 변환
   *
   * @param list {IMenuItem[]} 서버에서 가져온 메뉴 목록 데이터
   */
  public static alignMenuList(list: IMenuItem[]): IMenuItem[] {
    const newMenuList: IMenuItem[] = [];
    const parentMap = new Map<string, IMenuItem>();

    try {
      // First pass: Identify and store parent items
      for (const item of list) {
        if (item.menu_lv === '1' && item.menu_align.substring(2, 4) === '00') {
          newMenuList.push(item);
          parentMap.set(item.menu_align.substring(0, 2), item);
        }
      }

      // Second pass: Associate child items with their respective parents
      for (const item of list) {
        if (item.menu_lv !== '1') {
          const parentKey = item.menu_align.substring(0, 2);
          const parent = parentMap.get(parentKey);

          if (parent && parent.menu_align !== item.menu_align) {
            if (!parent.children) parent.children = [];
            parent.children.push(item);
          }
        }
      }

      return newMenuList;
    } catch (e) {
      return [];
    }
  }

}