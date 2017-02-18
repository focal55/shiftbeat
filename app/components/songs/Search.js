import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight } from 'react-native';
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

const mapActionsToProps = {
	addSongClear
};

export default connect(null, mapActionsToProps)(Search);