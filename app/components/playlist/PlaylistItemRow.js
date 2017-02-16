import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class Row extends Component {

	onButtonPress() {
		this.props.onPress(this.props.keyValue);
	}

	render() {
		if (this.props.title == "+ Add") {
			return (
				<View>
					<TouchableOpacity
						onPress={this.onButtonPress.bind(this)}>
						<Text>{this.props.title}</Text>
					</TouchableOpacity>
				</View>
			)
		}
		else {
			return (
				<View>
					<Text>{this.props.title}</Text>
				</View>
			)
		}
	}
}

export default Row;
