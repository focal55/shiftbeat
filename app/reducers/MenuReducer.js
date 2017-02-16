import {
  MENU_SET_ACTIVE
} from '../actions/types';

const INITIAL_STATE = {
  activeItem: 'myplaylists'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MENU_SET_ACTIVE:
      return { ...state, activeItem: action.payload };
    default:
      return state;
  }
}
