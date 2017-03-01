import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class MainContent extends Component {
    openRightDrawer() {
        this.props.openRightDrawerHandler();
    }
    openLeftDrawer() {
        this.props.openLeftDrawerHandler();
    }
    openBottomDrawer() {
        this.props.openBottomDrawerHandler();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Main Content</Text>
                </View>
                <TouchableOpacity style={{paddingTop:50}} onPress={this.openRightDrawer.bind(this)}>
                    <Text>Show Right Drawer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:10}} onPress={this.openLeftDrawer.bind(this)}>
                    <Text>Show Left Drawer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:10}} onPress={this.openBottomDrawer.bind(this)}>
                    <Text>Show Bottom Drawer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default MainContent