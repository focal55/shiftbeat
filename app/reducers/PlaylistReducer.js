import {
	PLAYLIST_CLEAR,
	PLAYLIST_SELECT,
	PLAYLIST_FETCH_SUCCESS,
	PLAYLIST_ADD_SONG,
	ALL_PLAYLISTS_FETCH_SUCCESS,
	NEW_PLAYLISTS_CREATE_SUCCESS,
	ADD_SONG_CLEAR
} from '../actions/types';

const INITIAL_STATE = {
	loading: true,
	list: null,
	selected: null,
	modalVisible: false,
	playlist: null,
	addSong: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLAYLIST_SELECT:
			return { ...state, selected: action.payload, modalVisible: true };
			break;
		case PLAYLIST_CLEAR:
			return { ...state, selected: null, modalVisible: false };
			break;
		case PLAYLIST_FETCH_SUCCESS:
			return { ...state, list: action.payload, loading: false };
			break;
		case ALL_PLAYLISTS_FETCH_SUCCESS:
			return { ...state, list: action.payload, loading: false };
			break;
		case NEW_PLAYLISTS_CREATE_SUCCESS:
			return { ...state,
				list: action.payload.list, playlist: action.payload.playlist, loading: false };
		case PLAYLIST_ADD_SONG:
			return {
				...state,
				list: action.payload.list,
				playlist: action.payload.playlist,
				addSong: true,
				modalVisible: true
			};
			break;
		case ADD_SONG_CLEAR:
			return { ...state, addSong: false, modalVisible: false };
			break;
		default:
			return state;
	}
}
