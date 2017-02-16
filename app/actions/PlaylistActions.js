import { ListView } from 'react-native';
import {
	PLAYLIST_CLEAR,
	PLAYLIST_SELECT,
	PLAYLIST_IS_LOADING,
	PLAYLIST_FETCH_SUCCESS,
	ALL_PLAYLISTS_FETCH_SUCCESS
} from './types';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Cache-Control': 'no-cache'
};

export const playlistSelect = (playlist) => {
  return {
    type: PLAYLIST_SELECT,
    payload: playlist
  }
};

export const playlistClear = () => {
  return {
    type: PLAYLIST_CLEAR,
    payload: null
  }
};

export const allPlaylistsFetch = () => {
	// return (dispatch) => {
	//   fetch('https://www.coldnosesfoundation.org/api/projects', { headers })
	//     .then((result) => {
	//       return result.json();
	//     })
	//     .then((data) => {
	//       dispatch({ type: PROJECT_LIST_FETCH_SUCCESS, payload: data });
	//     });
	// }
	let playlists = [
		{
			id: "1",
			title: 'My First Playlist',
			songs: [
				{
					id: "01010",
					title: "California Love",
					artist: "2Pac",
					interval: []
				}
			]
		},
		{
			id: "2",
			title: 'My Second Playlist',
			songs: [
				{
					id: "01010",
					title: "California Love",
					artist: "2Pac",
					interval: []
				}
			]
		}
	];

	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	return {
		type: ALL_PLAYLISTS_FETCH_SUCCESS,
		payload: ds.cloneWithRows(playlists)
	}
};


export const playlistFetch = () => {
  // return (dispatch) => {
  //   fetch('https://www.coldnosesfoundation.org/api/projects', { headers })
  //     .then((result) => {
  //       return result.json();
  //     })
  //     .then((data) => {
  //       dispatch({ type: PROJECT_LIST_FETCH_SUCCESS, payload: data });
  //     });
  // }
	let playlist = {
		id: "1",
		title: 'My First Playlist',
		songs: [
			{
				id: "01010",
				title: "California Love",
				artist: "2Pac",
				interval: []
			}
		]
	};

	playlist.songs.push({id:null, title: "+ Add"});
	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return {
    type: PLAYLIST_FETCH_SUCCESS,
		payload: ds.cloneWithRows(playlist.songs)
  }
};