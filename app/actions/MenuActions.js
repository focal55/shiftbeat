import {
  MENU_SET_ACTIVE
} from './types';

export const setActive = (key) => {
  return {
    type: MENU_SET_ACTIVE,
    payload: key
  }
};
