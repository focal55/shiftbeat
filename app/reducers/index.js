import { combineReducers } from 'redux';
import MenuReducer from './MenuReducer';
import PlaylistReducer from './PlaylistReducer';
import SpotifyReducer from './SpotifyReducer';

export default combineReducers({
  menu: MenuReducer,
  playlist: PlaylistReducer,
  spotify: SpotifyReducer
});
