import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight, NativeModules, Image } from 'react-native';
import { addSongClear } from '../../actions';


class Search extends Component {
	render() {
		return (
			<View>
				<Text>Search Songs</Text>



				<TouchableHighlight onPress={() => {
								this.props.addSongClear()
							}}>
					<Text>Hide Modal</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = {
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
	addSongClear
};

export default connect(null, mapActionsToProps)(Search);