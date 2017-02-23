import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	TextInput,
	TouchableHighlight,
	NativeModules
} from 'react-native';
import { addSongClear, spotifySearchText, spotifyUpdateSearchResults } from '../../actions';

const renderSearchResults = (props) => {
	if (props.spotify_search_results && !props.spotify_search_loading) {
		return props.spotify_search_results.map(item => (
			<Text key={item.id}>{item.name}</Text>
		));
	}
	else {
		return <Text>Loading</Text>
	}
};

class Search extends Component {

	handleUpdateSearchResults(text) {
		this.props.spotifySearchText(text);
		this.props.spotifyUpdateSearchResults(this.props.spotify_access_token, text, 'artist');
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapper}>

					<View style={styles.screenTitleWrapper}>
						<Text style={styles.screenTitle}>Search Spotify</Text>
					</View>

					<View style={styles.formItem}>
						<TextInput
							placeholder="Search Spotify"
							value={this.props.spotify_search_text}
							onChangeText={this.handleUpdateSearchResults.bind(this)}
							style={styles.formInput}
						/>
					</View>

					<View style={styles.resultsWrapper}>
						{renderSearchResults(this.props)}
					</View>

					<TouchableHighlight onPress={() => {
								this.props.addSongClear()
							}}>
						<Text>Hide Modal</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	wrapper: {
		borderRadius: 6,
		marginTop: 40,
		marginBottom: 40,
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
		backgroundColor: 'silver'
	},
	screenTitleWrapper: {
		alignItems: 'center',
		marginBottom: 20,
	},
	screenTitle: {
		fontSize: 18
	},
	formItem: {
		flexDirection: 'row',
	},
	formInput: {
		flex: 1,
		height: 20,
		width: 100,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: 'gray'
	},
	resultsWrapper: {
		paddingTop: 20
	},
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

const mapStateToProps = ({ spotify }) => {
	return {
		spotify_access_token: spotify.access_token,
		spotify_search_text: spotify.search_text,
		spotify_search_results: spotify.search_results,
		spotify_search_loading: spotify.search_loading
	}
};

const mapActionsToProps = {
	addSongClear,
	spotifySearchText,
	spotifyUpdateSearchResults
};

export default connect(mapStateToProps, mapActionsToProps)(Search);