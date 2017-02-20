import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	ListView,
	Modal,
	NativeModules
} from 'react-native';
import Search from './songs/Search';
import Row from './playlist/PlaylistItemRow';
import SpotifyLogin from './spotify/SpotifyLogin';
import {
	playlistCreate,
	playlistAddSong,
	addSongClear,
	spotifyCheckAccess,
	spotifyLogin
} from '../actions';

const Spotify = NativeModules.Spotify;
let _scrollToBottomX;

class Create extends Component {
	componentDidMount() {
		// Create new playlist.
		this.props.playlistCreate();
		// Check for Spotify auth.
		this.props.spotifyCheckAccess();
	}

	componentDidUpdate() {
		// On update move the list view.
		if (this.props.playlist.songs.length > 2) {
			this.refs.listView.scrollTo({ x: _scrollToBottomX - 80, animated: true });
		}
	}

	handleAddItem() {
		// Check for Spotify auth check.
		if (this.props.spotify_access_token) {
			this.props.playlistAddSong(this.props.playlist);
		}
		// No Spotify auth, show login.
		else {
			this.props.spotifyLogin();
		}
	}

	render() {
		// If we are showing the Spotify Auth.
		if (this.props.spotify_show_login) {
			return (
				<SpotifyLogin
					playlist={this.props.playlist}
				/>
			)
		}
		// We have Spotify Auth, show normal Create Ui.
		else {
			return (
				<View style={styles.container}>
					<Modal
						animationType={"slide"}
						transparent={false}
						visible={this.props.modalVisible}>
						<Search />
					</Modal>
					<ListView
						dataSource={this.props.songList}
						renderRow={(data) => <Row {...data} onPress={this.handleAddItem.bind(this)} />}
						horizontal={true}
						onContentSizeChange={(contentWidth, contentHeight)=>{
							_scrollToBottomX = contentWidth
						}}
						snapToAlignment={"center"}
						ref="listView"
					/>
				</View>
			)
		}
	}
}

const styles = {
	container: {
		flex:1,
		marginTop: 30
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 250,
		height: 45,
		borderRadius: 64
	},
	image: {
		width: 250,
		height: 50
	}
};


const mapStateToProps = ({ playlist, spotify }) => {
	return {
		songList: playlist.list,
		playlist: playlist.playlist,
		modalVisible: playlist.modalVisible,
		addSong: playlist.addSong,
		spotify_access_token: spotify.access_token,
		spotify_show_login: spotify.showLogin
	}
};

const mapActionsToProps = {
	playlistCreate,
	playlistAddSong,
	addSongClear,
	spotifyLogin,
	spotifyCheckAccess
};

export default connect(mapStateToProps, mapActionsToProps)(Create);