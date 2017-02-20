import React, { Component } from 'react';
import { View, TouchableHighlight, NativeModules, Image } from 'react-native';
import { connect } from 'react-redux';
import { spotifyLoginSuccess, playlistAddSong } from '../../actions';

const Spotify = NativeModules.Spotify;

class SpotifyLogin extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight style={styles.button} onPress={()=>{
						// Start Auth process
						Spotify.login({
							clientID:'6d19db9452464b8f8d5048a8775e90f3',
							redirectURL: 'freaque://callback',
							requestedScopes: ['streaming']
						},(error)=>{
							if(!error){
								this.props.spotifyLoginSuccess();
								this.props.playlistAddSong(this.props.playlist);
							} else {
								console.log('error:',error);
							}
						});
					}
				}>
					<Image resizeMode ={'contain'}
						 style={styles.image}
						 source={require('../../images/login-button-mobile.png')}
					/>
				</TouchableHighlight>
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

const mapActionsToProps = {
	spotifyLoginSuccess,
	playlistAddSong
};

export default connect(null, mapActionsToProps)(SpotifyLogin);