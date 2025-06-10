
import { MenuItem } from '@/types/menu';
import { beverageItems } from './beverages';
import { soupItems } from './soups';
import { starterItems } from './starters';
import { mainCourseItems } from './mainCourse';
import { riceAndNoodleItems } from './riceAndNoodles';
import { breadItems } from './breads';
import { saladItems } from './salads';
import { dessertItems } from './desserts';
import { newMenuItems } from './newMenuItems';
import { additionalMenuItems } from './additionalMenuItems';

export const menuItems: MenuItem[] = [
  ...beverageItems,
  ...soupItems,
  ...starterItems,
  ...mainCourseItems,
  ...riceAndNoodleItems,
  ...breadItems,
  ...saladItems,
  ...dessertItems,
  ...newMenuItems,
  ...additionalMenuItems
];
