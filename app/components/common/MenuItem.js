import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class MenuItem extends Component {

  onButtonPress() {
    this.props.onPress(this.props.keyValue);
  }

  render() {
    const activeButton = this.props.active ? styles.activeButton : {};
    const activeText = this.props.active ? styles.activeText : {};

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, activeButton]}
          onPress={this.onButtonPress.bind(this)}>

          <Text style={[styles.text, activeText]}>
            {this.props.children}
          </Text>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  button: {
  	padding: 10,
		alignSelf: 'center',
  },
  text: {
    alignSelf: 'flex-start',
    paddingTop: 2,
    paddingBottom: 2,
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  activeText: {
    color: 'lightblue'
  },
};
