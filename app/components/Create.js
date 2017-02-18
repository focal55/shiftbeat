import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	ListView,
	Modal,
	TouchableHighlight,
	NativeModules, Image
} from 'react-native';
import Search from './songs/Search';
import Row from './playlist/PlaylistItemRow';
import { playlistCreate, playlistAddSong, addSongClear } from '../actions';

const Spotify = NativeModules.Spotify;

let _scrollToBottomX;

const renderModal = (props) => {
	if (props.addSong && props.modalVisible) {
		if (props.spotify) {
			return (
				<Modal
					animationType={"slide"}
					transparent={false}
					visible={props.modalVisible}>
					<Search />
				</Modal>
			)
		}
		else {
			return (
				<Modal
					animationType={"slide"}
					transparent={false}
					visible={props.modalVisible}>
					<TouchableHighlight style={styles.button} onPress={
                  ()=>{
                    //Start Auth process
                    Spotify.login({
                    	clientID:'6d19db9452464b8f8d5048a8775e90f3',
                    	redirectURL: 'freaque://callback',
                    	requestedScopes: ['streaming']
                    },(error)=>{
                      if(!error){
                      	console.log("here");
                        this.props.navigator.replace({component: logInSuccess, title: 'Success'});
                      } else {
                        console.log('error:',error);
                      }
                    });
                  }
                }>
						<Image resizeMode ={'contain'}
									 style={styles.image}
									 source={require('../images/login-button-mobile.png')}
						/>
					</TouchableHighlight>
				</Modal>
			)
		}
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