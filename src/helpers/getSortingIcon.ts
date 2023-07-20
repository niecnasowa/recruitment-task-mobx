import { SortingOrder } from '../store/store';

export const getSortingIcon = (
  isActive: boolean,
  sortingOrder: SortingOrder
) => {
  if (isActive && sortingOrder === 'desc') {
    return '▼';
  }

  if (isActive && sortingOrder === 'asc') {
    return '▲';
  }

  return '▽';
};
