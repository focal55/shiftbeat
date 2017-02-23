import {
	SPOTIFY_LOGIN,
	SPOTIFY_LOGIN_SUCCESS,
	SPOTIFY_SEARCH_TEXT,
	SPOTIFY_UPDATE_SEARCH_RESULTS
} from '../actions/types';

const INITIAL_STATE = {
	access_token: null,
	showLogin: false,
	search_text: null,
	search_results: null,
	search_loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SPOTIFY_LOGIN:
			return { ...state, showLogin: true };
			break;
		case SPOTIFY_LOGIN_SUCCESS:
			return { ...state, access_token: action.payload, showLogin: false };
			break;
		case SPOTIFY_SEARCH_TEXT:
			return { ...state, search_text: action.payload, search_loading: true };
			break;
		case SPOTIFY_UPDATE_SEARCH_RESULTS:
			return { ...state, search_results: action.payload, search_loading: false };
			break;
		default:
			return state;
	}
}