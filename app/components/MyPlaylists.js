import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ListView, Modal, TouchableHighlight } from 'react-native';
import PlaylistsRow from './playlist/PlaylistsRow';
import Player from './player/Player';
import { allPlaylistsFetch, playlistSelect, playlistClear } from '../actions';

const renderModal = (props) => {
	if (props.playlist.selected && props.playlist.modalVisible) {
		return (
			<Modal
				animationType={"slide"}
				transparent={false}
				visible={props.modalVisible}
				onRequestClose={() => {alert("Modal has been closed.")}}>
				<Player />
			</Modal>
		)
	}
};

class MyPlaylists extends Component {
	componentDidMount() {
		this.props.allPlaylistsFetch();
	}

	handleSelectItem(playlist) {
		this.props.playlistSelect(playlist)
	}

	render() {
		if (this.props.playlist.loading) {
			return (
				<View style={styles.container}>
					<Text>Loading...</Text>
				</View>
			)
		}
		else {
			return (
				<View style={styles.container}>
					{renderModal(this.props)}
					<ListView
						dataSource={this.props.playlist.list}
						renderRow={(data) => <PlaylistsRow {...data} onPress={this.handleSelectItem.bind(this)} />}
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
	}
};

const mapStateToProps = ({ playlist }) => {
	return {
		playlist: playlist,
	}
};

const mapActionsToProps = {
	allPlaylistsFetch,
	playlistSelect,
	playlistClear
};

export default connect(mapStateToProps, mapActionsToProps)(MyPlaylists);