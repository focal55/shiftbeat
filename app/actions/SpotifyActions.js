import { NativeModules } from 'react-native';
import {
	SPOTIFY_LOGIN,
	SPOTIFY_LOGIN_SUCCESS,
	SPOTIFY_SEARCH_TEXT,
	SPOTIFY_UPDATE_SEARCH_RESULTS
} from './types';

const Spotify = NativeModules.Spotify;

export const spotifyCheckAccess = () => {
	return (dispatch) => {
		Spotify.getAccessToken((res) => {
			console.log("getAccessToken");
			console.log(res);
			dispatch({ type: SPOTIFY_LOGIN_SUCCESS, payload: res })
		})
	}
};

export const spotifyLogin = () => {
	return {
		type: SPOTIFY_LOGIN,
		payload: null
	}
};

export const spotifyLoginSuccess = () => {
	return (dispatch) => {
		Spotify.getAccessToken((res) => {
			dispatch({ type: SPOTIFY_LOGIN_SUCCESS, payload: res })
		})
	}
};

export const spotifySearchText = (text) => {
	return (dispatch) => {
		dispatch({ type: SPOTIFY_SEARCH_TEXT,	payload: text });
	}
};

export const spotifyUpdateSearchResults = (accessToken, text, type) => {
	return (dispatch) => {
		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'Cache-Control': 'no-cache',
			'Authorization': 'Bearer ' + accessToken
		};

		fetch('https://api.spotify.com/v1/search/?q=' + encodeURIComponent(text) + '&type=' + type, { headers })
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				if (data.artists && data.artists.items) {
					dispatch({ type: SPOTIFY_UPDATE_SEARCH_RESULTS, payload: data.artists.items });
				}
			})
			.catch(function(error) {
				console.log('There has been a problem with your fetch operation: ' + error.message);
			});
	}
};