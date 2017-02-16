import {
	PLAYLIST_CLEAR,
	PLAYLIST_SELECT,
	PLAYLIST_FETCH_SUCCESS,
	ALL_PLAYLISTS_FETCH_SUCCESS,
	NEW_PLAYLISTS_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	loading: true,
	list: null,
	selected: null,
	modalVisible: false
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
			return { ...state, list: action.payload, loading: false };
		default:
			return state;
	}
}
