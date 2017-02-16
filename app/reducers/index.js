import { combineReducers } from 'redux';
import MenuReducer from './MenuReducer';
import PlaylistReducer from './PlaylistReducer';

export default combineReducers({
  menu: MenuReducer,
  playlist: PlaylistReducer
});
