import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

const renderSearchResultImage = (data) => {
    if (data.images[0] && data.images[0].url) {
        return (
            <Image
                style={{width: 50, height: 50}}
                source={{uri: data.images[0].url}}
            />
        );
    }
    else {
        return (
            <Image
                style={{width: 50, height: 50}}
                source={{uri: "https://facebook.github.io/react/img/logo_og.png"}}
            />
        );
    }
};

class SearchItem extends Component {

	render() {
	    if (this.props.searchTypeItem == 'artist') {
            return (
                <View style={styles.listItem}>
                    {renderSearchResultImage(this.props.data)}
                    <Text>{this.props.data.name}</Text>
                </View>
            )
        }

        if (this.props.searchTypeItem == 'album') {
            return (
                <View style={styles.listItem}>
                    {renderSearchResultImage(this.props.data)}
                    <Text>{this.props.data.name}</Text>
                </View>
            )
        }

        if (this.props.searchTypeItem == 'track') {
            return (
                <View style={styles.listItem}>
                    {renderSearchResultImage(this.props.data.album)}
                    <Text>{this.props.data.name}</Text>
                </View>
            )
        }
	}
}

const styles = {
    listItem: {
        flexDirection: 'row',

    }
};

export default SearchItem