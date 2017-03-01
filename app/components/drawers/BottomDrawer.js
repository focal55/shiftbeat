import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class BottomDrawer extends Component {
    onCloseButtonPress() {
        this.props.closeHandler();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{paddingTop:50}} onPress={this.onCloseButtonPress.bind(this)}>
                    <Text>Hide Window</Text>
                </TouchableOpacity>
                <Text>Bottom Drawer</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'gray',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default BottomDrawer