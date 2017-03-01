import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class RightDrawer extends Component {
    onCloseButtonPress() {
        this.props.closeHandler();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{paddingTop:50}} onPress={this.onCloseButtonPress.bind(this)}>
                    <Text>Hide Window</Text>
                </TouchableOpacity>
                <Text>Right Menu</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'orange',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default RightDrawer