import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ListView, Modal, TouchableHighlight } from 'react-native';
import PlaylistsRow from './playlist/PlaylistsRow';
import { allPlaylistsFetch, playlistSelect, playlistClear } from '../actions';

const renderModal = (props) => {
	if (props.playlist.selected && props.playlist.modalVisible) {
		return (
			<Modal
				animationType={"slide"}
				transparent={false}
				visible={props.modalVisible}
				onRequestClose={() => {alert("Modal has been closed.")}}>
				<View style={{marginTop: 22}}>
					<View>
						<Text>{ props.playlist.selected.title }</Text>


						/* SONG LIST */


						<TouchableHighlight onPress={() => {
								props.playlistClear()
							}}>
							<Text>Hide Modal</Text>
						</TouchableHighlight>

					</View>
				</View>
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