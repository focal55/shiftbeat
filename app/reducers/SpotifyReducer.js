import {
	SPOTIFY_LOGIN,
	SPOTIFY_LOGIN_SUCCESS,
	SPOTIFY_SEARCH
} from '../actions/types';

const INITIAL_STATE = {
	access_token: null,
	showLogin: false,
	search_text: null,
	search_results: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SPOTIFY_LOGIN:
			return { ...state, showLogin: true };
			break;
		case SPOTIFY_LOGIN_SUCCESS:
			return { ...state, access_token: action.payload, showLogin: false };
			break;
		case SPOTIFY_SEARCH:
			return { ...state, search_text: action.payload.text, search_results: action.payload.results };
			break;
		default:
			return state;
	}
}