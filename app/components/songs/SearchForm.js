import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import {
    spotifySearchText,
    spotifyUpdateSearchResults,
    spotifyChangeSearchType
} from '../../actions';

class SearchForm extends Component {

    handleUpdateSearchResults(text) {
        this.props.spotifySearchText(text);
        this.props.spotifyUpdateSearchResults(this.props.spotify_access_token, text, this.props.spotify_search_type);
    }

	render() {
		return (
            <View>
                <View style={styles.searchTypeWrapper}>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.spotifyChangeSearchType('artist')
                    }}>
                        <Text style={this.props.spotify_search_type == 'artist' ? styles.searchTypeItemActive : styles.searchTypeItem}>Artist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.spotifyChangeSearchType('album')
                    }}>
                        <Text style={this.props.spotify_search_type == 'album' ? styles.searchTypeItemActive : styles.searchTypeItem}>Album</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.spotifyChangeSearchType('track')
                    }}>
                        <Text style={this.props.spotify_search_type == 'track' ? styles.searchTypeItemActive : styles.searchTypeItem}>Song</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formItem}>
                    <TextInput
                        placeholder="Search Spotify"
                        value={this.props.spotify_search_text}
                        onChangeText={this.handleUpdateSearchResults.bind(this)}
                        style={styles.formInput}
                    />
                </View>
            </View>
		)
	}
}

const styles = {
    searchTypeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    searchTypeItem: {
        color: 'white'
    },
    searchTypeItemActive: {
      color: 'blue'
    },
    formItem: {
        flexDirection: 'row',
        padding: 5
    },
    formInput: {
        flex: 1,
        height: 20,
        width: 100,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'gray'
    }
};

const mapStateToProps = ({ spotify }) => {
    return {
        spotify_access_token: spotify.access_token,
        spotify_search_text: spotify.search_text,
        spotify_search_type: spotify.search_type
    }
};

const mapActionsToProps = {
    spotifySearchText,
    spotifyUpdateSearchResults,
    spotifyChangeSearchType
};

export default connect(mapStateToProps, mapActionsToProps)(SearchForm);