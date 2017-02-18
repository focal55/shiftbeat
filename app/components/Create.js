import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	ListView,
	Modal,
	TouchableHighlight
} from 'react-native';
import Search from './songs/Search';
import Row from './playlist/PlaylistItemRow';
import { playlistCreate, playlistAddSong, addSongClear } from '../actions';

let _scrollToBottomX;

const renderModal = (props) => {
	if (props.addSong && props.modalVisible) {
		return (
			<Modal
				animationType={"slide"}
				transparent={false}
				visible={props.modalVisible}>
				<Search />
			</Modal>
		)
	}
};

class Create extends Component {
	componentDidMount() {
		this.props.playlistCreate();
	}

	componentDidUpdate() {
		if (this.props.playlist.songs.length > 1) {
			this.refs.listView.scrollTo({ x: _scrollToBottomX - 80, animated: true });
		}
	}

	handleAddItem() {
		this.props.playlistAddSong(this.props.playlist);
	}

	render() {
		return (
			<View style={styles.container}>
				{renderModal(this.props)}
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

const styles = {
	container: {
		flex:1,
		marginTop: 30
	}
};

const mapStateToProps = ({ playlist }) => {
	return {
		songList: playlist.list,
		playlist: playlist.playlist,
		modalVisible: playlist.modalVisible,
		addSong: playlist.addSong
	}
};

const mapActionsToProps = {
	playlistCreate,
	playlistAddSong,
	addSongClear
};

export default connect(mapStateToProps, mapActionsToProps)(Create);