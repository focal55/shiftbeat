import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class Row extends Component {

	onButtonPress() {
		this.props.onPress(this.props);
	}

	render() {
		return (
			<View>
				<TouchableOpacity
					onPress={this.onButtonPress.bind(this)}>
					<Text>{this.props.title}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export default Row;
