import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	TextInput,
	TouchableHighlight,
	NativeModules
} from 'react-native';
import SearchForm from './SearchForm';
import SearchItem from './SearchItem';
import { addSongClear } from '../../actions';

const renderSearchResults = (props) => {
	if (props.spotify_search_results && !props.spotify_search_loading) {
		return props.spotify_search_results.map(item => (
			<SearchItem key={item.id} searchTypeItem={props.spotify_search_type} data={{...item}} />
		));
	}
	else {
		return <Text>Loading</Text>
	}
};

class Search extends Component {

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapper}>
					<View style={styles.screenTitleWrapper}>
						<Text style={styles.screenTitle}>Search Spotify</Text>
					</View>

					<SearchForm />

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
        spotify_search_type: spotify.search_type,
		spotify_search_results: spotify.search_results,
		spotify_search_loading: spotify.search_loading
	}
};

const mapActionsToProps = {
	addSongClear
};

export default connect(mapStateToProps, mapActionsToProps)(Search);