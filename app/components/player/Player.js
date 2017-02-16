import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight } from 'react-native';
import { playlistClear } from '../../actions';

class Player extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Player</Text>
				<TouchableHighlight onPress={() => {
								this.props.playlistClear()
							}}>
					<Text>Hide Modal</Text>
				</TouchableHighlight>
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
		playlist: playlist,
	}
};

const mapActionsToProps = {
	playlistClear
};

export default connect(mapStateToProps, mapActionsToProps)(Player);